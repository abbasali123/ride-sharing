import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { AcceptRideInput, CreateRideInput, FeedbackInput, GetAllRideInput } from "../dto/ride.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Ride } from "../entities/ride.entity";
import { Repository } from "typeorm";
import { VehiclesService } from "./vehicles.service";
import { PricingTiersService } from "./pricingTiers.service";
import { RidePricingService } from "./ridePricing.service";
import { UsersService } from "src/users/services/users.service";
import Role from "src/enums/roles.enum";

@Injectable()
export class RidesService {
  constructor(
    @InjectRepository(Ride)
    private readonly rideRepository: Repository<Ride>,
    private readonly vehiclesService: VehiclesService,
    private readonly pricingTiersService: PricingTiersService,
    private readonly ridePricingService: RidePricingService,
    private readonly usersService: UsersService,
  ) {}

  async create(createRideInput: CreateRideInput) {
    const {
      departureTime,
      destinationLong,
      destinationLat,
      originLat,
      originLong,
      pricingTiersId,
      status,
      time,
      vehicleId,
      distance,
      customerId,
    } = createRideInput;

    const vehicle = await this.vehiclesService.findVehicleById(vehicleId);
    const pricingTier = await this.pricingTiersService.findPricingTierById(pricingTiersId);
    const customer = await this.usersService.findUserById(customerId);

    const transformedDistance = distance
      ? distance
      : this.calculateHaversineDistance(
          Number(originLat),
          Number(originLong),
          Number(destinationLat),
          Number(destinationLong),
        );

    const price = this.calculateRidePrice(
      transformedDistance,
      pricingTier.perMileRate,
      pricingTier.perMinuteRate,
      time,
    );

    const destination = `${destinationLat}_${destinationLong}`;
    const origin = `${originLat}_${originLong}`;

    // creating role
    const rideInstance = this.rideRepository.create({
      departureTime,
      destination,
      origin,
      price,
      status,
      distance: transformedDistance,
    });

    const ridePricingInstance = await this.ridePricingService.create({
      pricingTiersId,
      rideId: rideInstance.id,
      vehicleId,
    });
    rideInstance.ridePricing = [ridePricingInstance];

    rideInstance.customer = customer;
    rideInstance.customerId = String(customerId);
    //saving ride
    return await this.rideRepository.save(rideInstance);
  }

  calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): string {
    const earthRadius = 6371; // Radius of the Earth in kilometers

    // Convert latitude and longitude from degrees to radians
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lon1Rad = (lon1 * Math.PI) / 180;
    const lat2Rad = (lat2 * Math.PI) / 180;
    const lon2Rad = (lon2 * Math.PI) / 180;

    // Haversine formula
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate the distance
    const distance = earthRadius * c;

    return String(distance);
  }

  calculateRidePrice(
    distanceInKilometers: string,
    perMileRate: string, // Price per kilometer or mile
    perMinuteRate: string, // Price per minute
    time: string,
  ): string {
    // Calculate the price based on distance and time
    const distancePrice = Number(distanceInKilometers) * Number(perMileRate);

    const timePrice = Number(time) * Number(perMinuteRate);

    // Total price is the sum of distance price and time price
    const totalPrice = distancePrice + timePrice;

    return String(totalPrice);
  }

  async addPickupNotes(rideId: string, pickupNotes: string) {
    try {
      const ride = await this.rideRepository.findOne({ where: { id: rideId } });

      ride.pickupNotes = pickupNotes;
      return this.rideRepository.save(ride);
    } catch (error) {}
  }

  async addFeedback(feedbackInput: FeedbackInput) {
    try {
      const { rideId, rating, feedback } = feedbackInput || {};
      const ride = await this.rideRepository.findOne({ where: { id: rideId } });

      ride.rating = rating;
      ride.feedback = feedback;
      return this.rideRepository.save(ride);
    } catch (error) {}
  }

  async acceptRide(acceptRideInput: AcceptRideInput) {
    try {
      const { rideId, driverId } = acceptRideInput || {};
      const ride = await this.rideRepository.findOne({ where: { id: rideId } });
      const driver = await this.usersService.findUserById(driverId);
      if (driver.role !== Role.DRIVER) {
        throw new InternalServerErrorException("User must be driver to accept this ride");
      }
      ride.driver = driver;
      ride.driverId = String(driverId);
      return this.rideRepository.save(ride);
    } catch (error) {}
  }

  findAll(getAllRideInput: GetAllRideInput) {
    return this.rideRepository.find({ where: getAllRideInput });
  }

  findOne(id: number) {
    return `This action returns a #${id} ride`;
  }

  // update(id: number, updateRideInput: UpdateRideInput) {
  //   return `This action updates a #${id} ride`;
  // }

  remove(id: number) {
    return `This action removes a #${id} ride`;
  }

  async findRidesByCustomerId(customerId: string) {
    return this.rideRepository.find({ where: { customerId } });
  }

  async findRidesByDriverId(driverId: string) {
    return this.rideRepository.find({ where: { driverId } });
  }
}
