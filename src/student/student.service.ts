import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  getStudent(id: string): Promise<Student> {
    return this.studentRepository.findOneBy({ id });
  }

  createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
    const { firstName, lastName } = createStudentInput;
    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });

    return this.studentRepository.save(student);
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    const result = await this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        } as any,
      },
    });

    return result;
  }
}
