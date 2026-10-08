// Bootstrap the first director (no one can register as one):
//   npm run build && npm run create:director -- <name> <lastName> <email> <password>
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Role } from './user.entity';
import { UsersService } from './users.service';

async function main() {
  const [name, lastName, email, password] = process.argv.slice(2);
  if (!name || !lastName || !email || !password || password.length < 8) {
    throw new Error('usage: create:director -- <name> <lastName> <email> <password (min 8)>');
  }
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const user = await app.get(UsersService).create({ name, lastName, email, password, role: Role.DIRECTOR });
    console.log(`created director #${user.id} (${user.email})`);
  } finally {
    await app.close();
  }
}

main();
