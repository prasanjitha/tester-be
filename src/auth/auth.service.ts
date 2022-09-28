import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {

        try {
            const { username, password } = authCredentialsDto;
            const salt = await bcrypt.genSalt();
            console.log(salt);
            const user = new User();
            user.username = username;
            user.password = password;
            user.salt = salt;
            user.password = await this.hashPassword(password, salt);
            return await this.userRepository.save(user);
        } catch (error) {
            console.log(error.code);
            if (error.code === '23505') {
                throw new ConflictException('Username already exists');
            } else {
                throw new ConflictException('Username already exists');
            }


        }

    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const username = await this.validateUserPassword(authCredentialsDto);
        if (!username) {
            throw new UnauthorizedException('Invalid credentials.')
        }
        const payload = { username };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };

    }



    private async hashPassword(password: string, salt: string) {
        return await bcrypt.hash(password, salt);
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<String> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOneBy({ username });

        if (user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }


    }


}
