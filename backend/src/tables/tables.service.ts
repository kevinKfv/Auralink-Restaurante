import { Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TablesService {
  constructor(private prisma: PrismaService) { }

  create(createTableDto: CreateTableDto) {
    return this.prisma.table.create({
      data: createTableDto,
    });
  }

  findAll() {
    return this.prisma.table.findMany({
      orderBy: { number: 'asc' },
      include: { orders: { where: { status: { not: 'COMPLETED' } } } },
    });
  }

  findOne(id: string) {
    return this.prisma.table.findUnique({
      where: { id },
      include: { orders: true },
    });
  }

  update(id: string, updateTableDto: UpdateTableDto) {
    return this.prisma.table.update({
      where: { id },
      data: updateTableDto,
    });
  }

  remove(id: string) {
    return this.prisma.table.delete({
      where: { id },
    });
  }
}
