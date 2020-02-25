

sequelize model:create --name User 
--attributes 
firstName:string,
lastName:string,
password:string,
email:string,
role:enum(admin, guest)