// Function to display the current day at the top of the calendar
function displayCurrentDay() {
  const currentDayElement = document.getElementById("currentDay");
  const currentDay = dayjs().format("dddd, MMMM D, YYYY");
  currentDayElement.textContent = "Today is " + currentDay;
}

// Function to color-code time blocks based on past, present, and future
function colorCodeTimeBlocks() {
  const currentTime = dayjs().hour();

  $(".time-block").each(function () {
    const blockTime = parseInt($(this).attr("id"));

    if (blockTime < currentTime) {
      $(this).addClass("past");
    } else if (blockTime === currentTime) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });
}

// Function to handle click events on time blocks
function handleTimeBlockClick() {
  $(".time-block").on("click", function () {
    // Remove any existing input fields
    $(".time-block input").remove();

    // Create a new input field
    const inputField = $("<input>").attr({
      type: "text",
      class: "col-8 description",
      value: $(this).find(".description").text(), // Pre-fill with existing event if any
    });

    // Append the input field to the clicked time block
    $(this).append(inputField);

    // Focus on the input field for user convenience
    inputField.focus();

    // Handle saving the event when the user presses Enter
    inputField.on("keypress", function (event) {
      if (event.key === "Enter") {
        const enteredEvent = $(this).val();
        // Save the entered event to local storage
        saveEvent($(this).parent().attr("id"), enteredEvent);
        // Update the description text
        $(this).siblings(".description").text(enteredEvent);
        // Remove the input field
        $(this).remove();
      }
    });
  });
}

// Function to save an event to local storage
function saveEvent(timeBlockId, event) {
  const events = JSON.parse(localStorage.getItem("events")) || {};
  events[timeBlockId] = event;
  localStorage.setItem("events", JSON.stringify(events));
}

// Function to load events from local storage and update the time blocks
function loadEvents() {
  const events = JSON.parse(localStorage.getItem("events")) || {};

  Object.keys(events).forEach(function (timeBlockId) {
    const event = events[timeBlockId];
    $("#" + timeBlockId + " .description").text(event);
  });
}

// Call functions when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
  displayCurrentDay();
  colorCodeTimeBlocks();
  handleTimeBlockClick();
  loadEvents();
});
