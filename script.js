$(function () {
  const currentDate = dayjs().format("dddd, MMMM D");
  $("#currentDate").text(currentDate);

  function pastPresentFuture() {
      const timestamp = dayjs().hour();

      $(".time-block").each(function () {
          const hourBlock = parseInt($(this).attr("id").split("-")[1]);

          $(this).removeClass("past present future");

          if (hourBlock < timestamp) {
              $(this).addClass("past");
          } else if (hourBlock === timestamp) {
              $(this).addClass("present");
          } else {
              $(this).addClass("future");
          }
      });
  }
  // coded with help from coding tutor 
  function saveAllTasks() {
      const tasks = [];
      $(".time-block").each(function () {
          const hour = $(this).attr("id").split("-")[1];
          const description = $(this).find(".description").val();
          tasks.push({ hour, description });
          localStorage.setItem(`event-${hour}`, description);
      });
  }

  function loadAllTasks() {
      $(".time-block").each(function () {
          const hour = $(this).attr("id").split("-")[1];
          const savedDescription = localStorage.getItem(`event-${hour}`);
          if (savedDescription) {
              $(this).find(".description").val(savedDescription);
          }
      });
  }

  // Create time blocks for standard business hours (9AM to 5PM)
  for (let hour = 9; hour <= 17; hour++) {
      const timeBlock = $("<div>")
          .addClass("row time-block")
          .attr("id", `hour-${hour}`);

      const hourDiv = $("<div>")
          .addClass("col-2 col-md-1 hour text-center py-3")
          .text(`${hour > 12 ? hour - 12 : hour}${hour >= 12 ? "PM" : "AM"}`);

      const descriptionTextarea = $("<textarea>")
          .addClass("col-8 col-md-10 description")
          .attr("rows", 3)
          .data("hour", hour);

      const saveButton = $("<button>")
          .addClass("btn saveBtn col-2 col-md-1")
          .attr("aria-label", "save")
          .html('<i class="fas fa-save" aria-hidden="true"></i>');

      timeBlock.append(hourDiv, descriptionTextarea, saveButton);
      $(".container-lg").append(timeBlock);
  }

  // Load saved tasks on page load
  loadAllTasks();

  // Apply color coding  and update every second
  pastPresentFuture();
  setInterval(pastPresentFuture, 1000);

  // Handle save button clicks
  $(".container-lg").on("click", ".saveBtn", function () {
      saveAllTasks();
  });
});
