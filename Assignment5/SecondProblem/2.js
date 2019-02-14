
var employee = {
    name:'Arvinda',
    no:11616421,
    age:27,
    department:'services'
    }

document.getElementById('btn').addEventListener('click',function(){
    document.getElementById('einfo').innerHTML=employee.name+" is working in "+
    employee.department+" department.";
    });