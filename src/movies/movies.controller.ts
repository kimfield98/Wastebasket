import { Controller, Get, Post, Delete, Param, Body, Patch, Query } from '@nestjs/common'
import { MoviesService } from './movies.service'
import { Movie } from './entities/movie.entity'
import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'

@Controller('movies')
export class MoviesController {

  constructor(private readonly movieService: MoviesService) {}

  @Get()
  getAll():Movie[] {
    return this.movieService.getAll()
  }

  @Get(':id')
  getOne(@Param('id') movieID:number):Movie {
    console.log(typeof movieID)
    return this.movieService.getOne(movieID)
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.movieService.create(movieData)
  }

  @Delete(':id')
  remove(@Param('id') movieId:number) {
    return this.movieService.deleteOne(movieId)
  }

  @Patch(':id')
  path(@Param('id') movieId:number, @Body() updateData: UpdateMovieDto) {
    return this.movieService.update(movieId,updateData)
  }
}
