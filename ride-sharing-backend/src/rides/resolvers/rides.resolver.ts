import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { AcceptRideInput, CreateRideInput, FeedbackInput, GetAllRideInput } from "../dto/ride.input";
import { Ride } from "../entities/ride.entity";
import { RidesService } from "../services/rides.service";
import { RidePricing } from "../entities/ridePricing.entity";
import { RidePricingService } from "../services/ridePricing.service";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/services/users.service";
import { IsDriverGuard } from "src/auth/guards/isDriverGuard.guard";
import { CurrentUser } from "src/auth/decorators/user.decorator";
import { CurrentUserInterface } from "src/common/interfaces";

@Resolver(() => Ride)
export class RidesResolver {
  constructor(
    private readonly ridesService: RidesService,
    private readonly ridePricingService: RidePricingService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => Ride)
  @UseGuards(JwtAuthGuard)
  async createRide(@Args("createRideInput") createRideInput: CreateRideInput): Promise<Ride> {
    return this.ridesService.create(createRideInput);
  }

  @Mutation(() => Ride)
  @UseGuards(JwtAuthGuard)
  async addPickupNotes(@Args("rideId") rideId: string, @Args("pickupNotes") pickupNotes: string): Promise<Ride> {
    return this.ridesService.addPickupNotes(rideId, pickupNotes);
  }

  @Mutation(() => Ride)
  @UseGuards(JwtAuthGuard)
  async addFeedback(@Args("feedbackInput") feedbackInput: FeedbackInput): Promise<Ride> {
    return this.ridesService.addFeedback(feedbackInput);
  }

  @Mutation(() => Ride)
  @UseGuards(JwtAuthGuard)
  async acceptRide(
    @Args("acceptRideInput") acceptRideInput: AcceptRideInput,
    @CurrentUser() user: CurrentUserInterface,
  ): Promise<Ride> {
    const driverId = user.userId;
    return this.ridesService.acceptRide({ ...acceptRideInput, driverId });
  }

  @Query(() => [Ride])
  @UseGuards(JwtAuthGuard)
  findAllRides(@Args("getAllRideInput") getAllRideInput: GetAllRideInput) {
    return this.ridesService.findAll(getAllRideInput);
  } 

  @ResolveField(() => [RidePricing])
  async ridePricing(@Parent() ride: Ride): Promise<RidePricing[]> {
    if (ride) {
      return await this.ridePricingService.getRidingPriceByRide(ride.id);
    }
  }

  @ResolveField(() => User)
  async customer(@Parent() ride: Ride): Promise<User> {
    if (ride) {
      return await this.usersService.findUserById(Number(ride.customerId));
    }
  }

  @ResolveField(() => User)
  async driver(@Parent() ride: Ride): Promise<User> {
    if (ride) {
      return await this.usersService.findUserById(Number(ride.driverId));
    }
  }
}
