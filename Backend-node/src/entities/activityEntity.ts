import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import {User} from './userEntity';

import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsFQDN,
  IsDate,
  Min,
  Max,
  isEmail,
  IsEmail,
  IsString,
  MaxLength,
  IsEnum,
  IsNumber,
} from 'class-validator';

enum ActivityEnum {
  school = 'school',
  work = 'work',
  workout = 'workout',
  free_time = 'free_time',
  other = 'other',
}

export class UpdateActivityDto {
  @IsString()
  @MaxLength(30)
  activity_name?: string;

  @IsDate()
  activity_time_start?: Date;

  @IsDate()
  activity_time_end?: Date;

  @IsEnum(ActivityEnum)
  activity_type?: ActivityEnum;

  @IsString()
  description?: string;

  @IsNumber()
  user_id?: number;
}

@Entity({name: 'activities'})
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', nullable: false, length: 30})
  activity_name: string;

  @Column({type: 'timestamp', nullable: false})
  activity_time_start: Date;

  @Column({type: 'timestamp', nullable: false})
  activity_time_end: Date;

  @Column({type: 'enum', enum: ActivityEnum})
  activity_type: ActivityEnum;

  @Column({type: 'text', nullable: false})
  description: Text;

  @Column({type: 'bigint', nullable: false})
  user_id: Number;

  @ManyToOne(() => User, (user) => user.activities)
  @JoinColumn({name: 'user_id'})
  user: User;

  @Column({type: 'timestamp', nullable: false})
  created_at: Date;

  @Column({type: 'timestamp', nullable: false})
  updated_at: Date | undefined;
}
