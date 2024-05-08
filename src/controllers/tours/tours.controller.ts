import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuardService } from 'src/services/jwt-auth.guard/jwt-auth.guard.service';
import { ToursService } from 'src/services/tours/tours.service';
import { Tour } from 'src/shemas/tour';

@Controller('tours')
export class ToursController {

    constructor(private toursService: ToursService){}

    // @UseGuards(JwtAuthGuardService)

    // @Get()
    // getAllTours(): void {
    //     this.toursService.generateTours();
    // }

    @Get()
    getAllTours(): Promise<Tour[]> {
        return this.toursService.getAllTours();
    }

    @Get(":id")
    getTourById(@Param('id') id): Promise<Tour> {
      return this.toursService.getTourById(id);
    }

    @Post()
    initTours():Promise<Tour[]> {
        this.toursService.generateTours();
        return this.toursService.getAllTours();
    }


    // @Get(":remove")
    // deleteAllTours(@Param('remove') remove): void {
    //     this.toursService.deleteTours();
    // }

    @Delete()
    deleteAllTours(): void {
        this.toursService.deleteTours();
    }
}
