enum DatabaseType{
    MYSQL = 'mysql',
    MONGODB = 'mongodb',
    POSTGRESQL = 'postgresql',
    SQLITE = 'sqlite3',
    ORACLE = 'oracle',
    MSSQL = 'mssql',
    SNOWFLAKE = 'snowflake',
    MARIADB = 'mariadb',
}

enum MongoDriverType{
    MONGOOSE = "mongoose",
    MONGODB = "mongodb"
}

export { DatabaseType, MongoDriverType };