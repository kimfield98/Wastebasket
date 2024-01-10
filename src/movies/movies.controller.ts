import { Controller, Get, Post, Delete, Param, Body, Patch, Query } from '@nestjs/common'

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies'
  }

  @Get('search')
  search(@Query('year') serachingYear:string) {
    return `We are searching for a movie made after: ${serachingYear}`
  }

  @Get(':id')
  getOne(@Param('id') movieID:string) {
    return `This will return one movie with the id: ${movieID}`
  }

  @Post()
  create(@Body() movieData) {
    console.log(movieData)
    return movieData
  }

  @Delete(':id')
  remove(@Param('id') movieId:string) {
    return `This will delete a movie with the id: ${movieId}`
  }

  @Patch(':id')
  path(@Param('id') movieId:string, @Body() updateData) {
    return {
      updateMovie: movieId,
      ...updateData
    }
  }
}
