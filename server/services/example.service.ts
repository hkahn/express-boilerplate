import { exampleDTO, exampleParamsDTO, exampleQueryDTO } from '../dtos/example.dto';
import db from '../models/db';
import { Example } from '../models';

export default class ExampleService {
  public async index({ page = 0, perPage = 20 }: exampleQueryDTO): Promise<Example[]> {
    const skip = (page - 1) * perPage;
    return await db.Example.find({ deletedAt: null }).skip(skip).limit(perPage);
  }

  public async store(body: exampleDTO): Promise<Example> {
    const example = new Example(body);
    return await db.Example.create(example);
  }

  public async show(params: exampleParamsDTO): Promise<Example | null> {
    return await db.Example.findOne({ _id: params._id, deletedAt: null });
  }

  public async update(params: exampleParamsDTO, body: exampleDTO): Promise<Example | null> {
    return await db.Example.findOneAndUpdate({ _id: params._id, deletedAt: null }, body, { new: true });
  }

  public async destroy(params: exampleParamsDTO): Promise<Example | null> {
    return await db.Example.findOneAndUpdate({ _id: params._id }, { deletedAt: new Date() }, { new: true });
  }
}
