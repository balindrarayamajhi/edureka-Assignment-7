
document.getElementById('btn').addEventListener('click',
    function () {
        var qt=document.getElementById('qty');
        var qtval=parseFloat(qt.value);
        var price=22.25;
        var netAmount=price*qtval;
        document.getElementById('finalAmount').innerHTML(netAmount);
    });
