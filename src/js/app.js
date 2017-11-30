import "./bootstrap";

import { sticky } from "jquery-sticky";

const Easing = require("jquery.easing");

$(document).ready(() => {
    $("#header").sticky({ topSpacing: 0, zIndex: "50" });

    $('a[href*="#"]:not([href="#"])').click(function() {
        const target = $(this.hash);
        let links = $("#header .navbar .nav-item .nav-link");
        links.each((index, link) => {
            if (this.hash == link.hash) {
                $(link).addClass("active");
            } else {
                $(link).removeClass("active");
            }
        });
        $("html, body").animate(
            { scrollTop: target.offset().top },
            1000,
            "easeInOutExpo"
        );
        return false;
    });
});
