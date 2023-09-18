import { InputType, Int, Field, PartialType } from '@nestjs/graphql';
import Role from '../../enums/roles.enum';

@InputType()
export class GetAllVehicleInput {
    @Field(()=>String, { nullable: true })
    id?: string;
  
    @Field(()=>String, { nullable: true })
    name?: string;
  
    @Field(()=>String, { nullable: true })
    description?: string;
  
    @Field(()=>String, { nullable: true })
    iconUrl?: string;
}

