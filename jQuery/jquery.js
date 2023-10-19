$(document).ready(function () {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://pokeapi.co/api/v2/pokemon-color/yellow", true);

  function addStripes() {
    $("table tr").removeClass("striped");
    $("table tr:nth-child(even)").addClass("striped");
  }

  function afterRender() {
    $('[data-toggle="popover"]').popover();
    $("table th").css("color", "darkblue");
    addStripes();

    setTimeout(function () {
      const hideElements = $("table td a:contains('p')").filter(function () {
        return this.innerHTML.indexOf("p") == 0;
      });
      hideElements.closest("tr").remove();
      addStripes();

      const info = $("<div></div>")
        .insertAfter($("#pokemon-list"))
        .text("Skriveno: " + hideElements.length);
    }, 2000);
  }

  function fillList() {
    const data = JSON.parse(xhr.response);
    const source = $("#pokemon-list").html();
    const template = Handlebars.compile(source);
    const context = {
      pokemon: data.pokemon_species.slice(0, 20),
      tableClass: "table",
    };
    const html = template(context);

    $("#result").html(html);

    afterRender();
    resizeWindow();
  }

  xhr.onload = function () {
    fillList();
  };

  xhr.send();

  $("body").on("mouseenter", "table tr", function () {
    $(this).css("background-color", "yellow");
  });

  $("body").on("mouseleave", "table tr", function () {
    $(this).css("background-color", "");
  });

  function resizeWindow() {
    $(window).on("resize", function () {
      console.log(window.innerWidth);
    });
  }
});
