import { Controller, Get, Post, Delete, Param, Body, Patch, Query } from '@nestjs/common'
import { MoviesService } from './movies.service'
import { Movie } from './entities/movie.entity'

@Controller('movies')
export class MoviesController {

  constructor(private readonly movieService: MoviesService) {}

  @Get()
  getAll():Movie[] {
    return this.movieService.getAll()
  }

  @Get(':id')
  getOne(@Param('id') movieID:string):Movie {
    return this.movieService.getOne(movieID)
  }

  @Post()
  create(@Body() movieData) {
    return this.movieService.create(movieData)
  }

  @Delete(':id')
  remove(@Param('id') movieId:string) {
    return this.movieService.deleteOne(movieId)
  }

  @Patch(':id')
  path(@Param('id') movieId:string, @Body() updateData) {
    return this.movieService.update(movieId,updateData)
  }
}
