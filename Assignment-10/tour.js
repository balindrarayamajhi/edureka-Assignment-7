window.onload = function() {
    document.getElementById('tour-start-btn').onclick = function() {

        var tour = new Tour({
            storage: false
        });
        var name = prompt("Enter your name");
        tour.addSteps([{
                element: "#class",
                placement: 'bottom',
                title: 'Live Classses',
                content: function() {
                    return 'Welcome ' + name + ' !<br/>Classes are interactive and happen in real time.'
                }
            },
            {
                element: "#schedule",
                placement: 'bottom',
                title: 'Flexible Schedule',
                content: function() {
                    return name + ' ,you can transfer batches in between'
                }
            },
            {
                element: "#support",
                placement: 'bottom',
                title: '24 * 7 Support',
                content: function() {
                    return name + ' ,you will get round the clock support'
                }
            },
            {
                element: "#fresh-courses",
                placement: 'top',
                title: 'Fresh Backed Courses',
                content: function() {
                    return name + ' ,Look at these courses . You may like it.'
                }
            },

            {
                orphan: true,
                placement: 'top',
                backdrop: 'true',
                content: 'Thank you for visiting the site.'
            }


        ])
        if (name != null) {

            tour.init();
            tour.start();
        }
    }
}