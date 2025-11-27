import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  private profiles = [
    {
      id: randomUUID(),
      name: 'Brianna Watts',
      description: `Looking for someone to merge with my heart. I’m a full-stack romantic who refactors my feelings until they pass all tests. Bonus points if you can debug my issues while we pair program over coffee. Let’s commit to something beautiful together.`,
    },
    {
      id: randomUUID(),
      name: 'Jasper Quinn',
      description: `Seeking a partner in crime to compile my heart. Must be comfortable with the terminal because I only speak fluent bash. Swipe right if you can appreciate a good kernel panic every now and then.`,
    },
    {
      id: randomUUID(),
      name: 'Leo Park',
      description: `You think you know VIM? Try Neovim. I'll make your modal dreams come true. Want to escape the matrix and explore the perfect keyboard shortcut for love?`,
    },
  ];

  findAll() {
    return this.profiles;
  }

  findOne(id: string) {
    const profile = this.profiles.find((profile) => profile.id === id);

    if (!profile) {
      throw new NotFoundException(`Profile with id ${id} not found`);
    }

    return profile;
  }

  create(createProfileDto: CreateProfileDto) {
    const profile = {
      id: randomUUID(),
      ...createProfileDto,
    };

    this.profiles.push(profile);
    return profile;
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    const profile = this.profiles.find((profile) => profile.id === id);

    if (!profile) {
      throw new NotFoundException(`Profile with id ${id} not found`);
    }

    const updatedProfile = { ...profile, ...updateProfileDto };
    this.profiles[this.profiles.indexOf(profile)] = updatedProfile;
    return updatedProfile;
  }

  delete(id: string) {
    const profile = this.profiles.find((profile) => profile.id === id);

    if (!profile) {
      throw new NotFoundException(`Profile with id ${id} not found`);
    }

    this.profiles.splice(this.profiles.indexOf(profile), 1);
    return;
  }
}
