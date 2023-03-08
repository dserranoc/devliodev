import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import Project, { ProjectInput, ProjectDocument } from '../models/project.model'

const ProjectService = {
  save: async (project: ProjectInput) => {
    const newProject = new Project(project)
    const savedProject = await newProject.save()
    return savedProject.toJSON()
  },
  find: async (query: FilterQuery<ProjectDocument>, options: QueryOptions = { lean: true }) => {
    const project = await Project.findOne(query, {}, options)
    return project
  },
  findAndUpdate: async (query: FilterQuery<ProjectDocument>, update: UpdateQuery<ProjectDocument>, options: QueryOptions) => {
    return await Project.findOneAndUpdate(query, update, options)
  },
  delete: async (query: FilterQuery<ProjectDocument>) => {
    return await Project.deleteOne(query)
  }
}

export default ProjectService
