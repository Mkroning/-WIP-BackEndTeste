import moment from 'moment';
import dbQuery from '../database/dev/dbQuery';

import { 
  errorMessage, successMessage, status,
} from '../helpers/status';

const Index = async (req, res) => {
  const getAllNavers = 'SELECT * FROM navers ORDER BY id DESC';
  try {
    const { rows } = await dbQuery.query(getAllNavers);
    const dbResponse = rows;
    if (dbResponse[0] === undefined){
      errorMessage.error = 'There are no navers';
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.sucess).send(successMessage);
  } catch(error){
    errorMessage.error = 'An error Ocurred';
    return res.status(status.error).send(errorMessage);
  }
};

const Store = async (req, res) =>{
  const { 
    name, birthdate, admission_date, job_role,
  } = req.body;
  const {
    project_name, project_id
  } = req.project;
  const created_on = moment(new Date());

  const createNaver = `INSERT INTO
  naver(name, birthdate, admission_date, job_role, project_name ,project_id, created_on)
  VALUES($1, $2, $3, $4, $5, $6, $7)
  returnig *`;

  const values = [
    name,
    birthdate,
    admission_date,
    job_role,
    project_name,
    project_id,
    created_on,
  ];
  try {
    const { rows } = await dbQuery.query(createNaver, values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  }catch(error){
    if (error.routine === '_bt_check_unique') {
      errorMessage.error = 'Ops, an unexpected error occurred';
      return res.status(status.error).send(errorMessage);
    }
    errorMessage.error = 'Unable to create naver';
    return res.status(status.error).send(errorMessage);
  }
};

const Update = async (req, res) => {
  const { naverId } = req.params;
  const { name, birthdate, admission_date, job_role } = req.body;
  const { project_id } = req.project;
  
  const findNaver = 'SELECT * FROM navers WHERE id=$1';
  const updateNaver  = `UPDATE navers
  SET name=$1, birthdate=$2, admission_date=$3, job_role=$4 WHERE user_id=$5 returning *`;
  try {
    const { rows } = await dbQuery.query(findNaver, [naverId]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = 'Naver cannot be found';
      return res.status(status.notfound).send(errorMessage);
    }
    const values = [
      name,
      birthdate,
      admission_date,
      job_role,
      naverId,
      project_id,
    ];
    const response = await dbQuery.query(updateNaver, values);
    const dbResult = response.rows[0];
    delete dbResult.password;
    successMessage.data = dbResult;
    return res.status(status.sucess).send(successMessage);
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
  const { naverId } = req.params;
  const deleteNaver = 'DELETE FROM navers WHERE id=$1 returning *';
  try {
    const { rows } = await dbQuery.query(deleteNaver, [naverId]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = 'You have no naver with that id';
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = {};
    successMessage.data.message = 'Naver deleted successfully';
    return res.status(status.sucess).send(successMessage);
  } catch (error) {
    return res.status(status.error).send(error);
  }
};

export {
  Index,
  Store,
  Delete,
  Update,
}