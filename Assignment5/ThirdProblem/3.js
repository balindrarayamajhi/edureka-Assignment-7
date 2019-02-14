(document.getElementById('btn').
addEventListener('click',findMaxofThree));

    function findMaxofThree(){
        var num1=parseInt(document.getElementById('first-number').value);
        var num2=parseInt(document.getElementById('second-number').value);
        var num3=parseInt(document.getElementById('third-number').value);

        var largest= num1>num2 ? (num1>num3?num1:num3):(num2>num3?num2:num3);
        document.getElementById('largest-number').innerHTML=" The largest among three numbers is "+ largest+".";
       

    }