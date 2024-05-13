import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TourDto } from 'src/dto/tour-dto';
import { ITourClient } from 'src/interfaces/tour';
import { Tour, TourDocument } from 'src/shemas/tour';

@Injectable()
export class ToursService {
    private toursCount = 9;
    constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>) {

    }

    async generateTours(): Promise<any> {
        for(let i = 0; i <= this.toursCount; i++) {
            const tour = new TourDto('test'+i, 'testdesc', 'test operator', '222'+i, 'pic'+i+'.jpg');
            const tourData = new this.tourModel(tour);
            tourData.save();
         
            
        }
    }

    async deleteTours(): Promise<any>{
    
        return this.tourModel.deleteMany({});
        
    }

    async getAllTours(): Promise<Tour[]> {
        // console.log(this.tourModel.find())
        return this.tourModel.find();
      }

    async getTourById(id: string): Promise<Tour> {
        return this.tourModel.findById(id);
      }

    async uploadTour(body: ITourClient){
        const tour = new TourDto(body.name,body.description,body.tourOperator, body.price,body.img);
        const tourData = new this.tourModel(tour);
        // console.log('tourData: ', tourData);
        await tourData.save();
      }

}
