import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import {Activity} from './activityEntity';
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
  IsNotEmpty,
} from 'class-validator';

// interface newUserDTO {
//   username: string;
//   whole_name: string;
//   email: string;
// }

export class newUserDTO {
  @IsNotEmpty()
  @Length(3, 20)
  username: string;
  @IsNotEmpty()
  @Length(5, 25)
  whole_name: string;
  @IsEmail()
  email: string;
  password: string;
}

export class updateUserDTO {
  @IsNotEmpty()
  @Length(3, 20)
  username: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @Length(5, 25)
  password: string;
}

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', nullable: false, length: 20})
  username: string;

  @Column({type: 'varchar', nullable: false, length: 20})
  whole_name: string;

  @Column({type: 'varchar', nullable: false, length: 255})
  email: string;

  @OneToMany(() => Activity, (activity) => activity.user, {eager: true})
  activities: Activity[];

  @Column({type: 'varchar', nullable: false, length: 32})
  password: string;
}
