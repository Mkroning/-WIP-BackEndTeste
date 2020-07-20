import moment from 'moment';
import dbQuery from '../database/dev/dbQuery';

import {
  errorMessage, successMessage, status
} from '../helpers/status';

const Index = async (req, res) => {
  const getAllProjects = 'SELECT * FROM projects ORDER BY id DESC';
  try {
    const { rows } = await dbQuery.query(getAllProjects);
    const dbResponse = rows;
    if (dbResponse[0] === undefined){
      errorMessage.error = 'There are no projects';
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage)
  } catch (error){
    errorMessage.error = 'An error ocurred';
    return res.status(status.error).send(errorMessage);
  }
};

const Show = async (req, res) => {
  const getIdProject = 'SELECT projects_id FROM projects ORDER BY name FETCH FIRST ROW ONLY';
  try {
    const { rows } = await dbQuery.query(getIdProject);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      errorMessage.error = 'There are no project';
      return res.status(status.bad).send(errorMessage);
    }
    
    successMessage.data = dbResponse;
    return res.status(status.error).send(successMessage);
  } catch (error) {
    errorMessage.error = 'An error ocurred';
    return res.status(status.error).send(errorMessage);
  }
};

const Store = async (req, res) => {
  const { name } = req.body;
  const { naverID } = req.navers;
  const createProjects = `INSERT INTO
  project(name, naverID)
  VALUES($1, $2) returning *`;
  const values = [
    name,
    naverID,
  ];

  try {
    const { rows } = await dbQuery.query(createProjects, values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    if (error.routine === '_bt_check_unique'){
      errorMessage.error = 'Ops, an unexpected error occurred';
      return res.status(status.error).send(errorMessage);
    }
    errorMessage.error = 'Unable to create projects';
    return res.status(status.error).send(errorMessage);
  }
};

const Update = async (req, res) => {
  const { projectId } = req.params;
  const { name, naverID } = req.body;
  const findProject = 'SELECT * FROM projects WHERE id=$1';
  const updateProject = `UPDATE projects
  SET name=$1 WHERE naverID=$2 returning *`;
  try{
    const { rows } = await dbQuery.query(findProject, [projectId]);
    const dbResponse = rows[0];
    if (!dbResponse){
      errorMessage.error = 'Project cannot be found';
      return res.status(status.notfound).send(errorMessage);
    }
    const values = {
      name,
      naverID,
    };
    const response = await dbQuery.query(updateProject, values);
    const dbResult = response.rows[0];
    delete dbResult.password;
    successMessage.data = dbResult;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      errorMessage.error = 'Ops, an unexpected error occurred';
      return res.status(status.conflict).send(errorMessage);
    }
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};

const Delete = async (req, res) => {
  const { projectId } = req.params;
  const deleteProject = 'DELETE FROM projects WHERE id=$1 returning *';
  try {
    const { rows } = await dbQuery.query(deleteProject, [projectId]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = 'You have no project with that id';
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = {};
    successMessage.data.message = 'Project Deleted successfully';
    return res.status(status.success).send(successMessage);
  } catch (error) {
    return res.status(status.error).send(error);
  }
};
export {
  Index,
  Show,
  Store,
  Delete,
  Update,
}