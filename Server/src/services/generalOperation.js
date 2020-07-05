const mongoose = require("mongoose");

class generalOperation {
  /** Insert Single Record
   * @description Insert Single Record In Any collection
   * @param  {object} data -  form information
   * @param  {string} tableName -  Collection Name In Which Insert The Record
   */

  static async addRecord(tableName, data) {
    const Table = mongoose.model(`${tableName}`);
    const info = new Table(data);
    return await info.save();
  }

  /**
   * @param  {object} data - data to be updated
   * @param  {string} id - id of dhs form object
   */

  static async updateRecord(TableName, id, data) {
    const Table = mongoose.model(`${TableName}`);
    return await Table.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { new: true }
    );
  }
  static async updateManyRecord(TableName, condition, data) {
    const Table = mongoose.model(`${TableName}`);
    return await Table.updateMany(
      condition,
      { $set: data },
      { returnNewDocument: true }
    );
  }
  /**
   * @param  {object} data - data to be updated
   * @param  {string} id - id of dhs form object
   */

  static async updateRecordOnCondition(TableName, condition, data) {
    const Table = mongoose.model(`${TableName}`);
    return await Table.findOneAndUpdate(condition, data, {
      returnNewDocument: true
    });
  }

  /**
   * @param  {object} condition - key value pair for applying condition if you need all data send
   * empty condition {}
   * @param  {string} TableName - id of dhs form object
   */

  static async getRecord(tableName, condition) {
    const Table = mongoose.model(`${tableName}`);
    return await Table.find(condition);
  }

  static async getSingleRecord(tableName, condition) {
    const Table = mongoose.model(`${tableName}`);
    return await Table.findOne(condition);
  }

  /**
   * @param  {object} condition - key value pair for applying condition if you need all data send
   * empty condition {}
   * @param  {string} TableName - id of dhs form object
   */

  static async getRecordWithPagination(tableName, condition, options) {
    const Table = mongoose.model(`${tableName}`);
    return await Table.paginate(condition,options);
  }

  /**
   * @param  {object} condition - key value pair for applying condition if you need all data send
   * empty condition {}
   * @param  {string} TableName - id of dhs form object
   */

  static async getRecordAggregate(tableName, aggregateArray) {
    const Table = mongoose.model(`${tableName}`);
    return await Table.aggregate(aggregateArray);
  }

  /**
   * @param  {object} condition - condition is key value pair for deleting specific if you want to truncate the table
   * send empty condition e.g {}
   * @param  {string} TableName - id of dhs form object
   */

  static async deleteRecord(tableName, condition) {
    const Table = mongoose.model(`${tableName}`);
    return await Table.deleteMany(condition);
  }

  /**
   * @param  {object} condition - condition is key value pair for deleting specific if you want to truncate the table
   * send empty condition e.g {}
   * @param  {string} TableName - id of dhs form object
   */

  static async findAndModifyRecord(tableName, condition, sort, update, upsert) {
    const Table = mongoose.model(`${tableName}`);
    return await Table.findOneAndUpdate(condition, update, {
      upsert:true,
      returnNewDocument: true
    });
  }
}

module.exports = generalOperation;
