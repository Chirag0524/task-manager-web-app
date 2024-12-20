$(document).ready(function() {
    // Add new task
    $('#add-task-button').click(function() {
        const taskName = $('#new-task-input').val().trim();
        if (taskName) {
            addTask(taskName);
            $('#new-task-input').val('');
        }
    });

    // Filter tasks based on completion status
    $('#filter-tasks').change(function() {
        filterTasks($(this).val());
    });

    // Function to add a new task
    function addTask(taskName) {
        const taskHtml = `
            <li class="task">
                <span class="task-name">${taskName}</span>
                <div class="actions">
                    <div class="tooltip">
                        <button class="edit-task"><i class="fa fa-edit"></i></button>
                        <span class="tooltiptext">Edit task</span>
                    </div>
                    <div class="tooltip">
                        <button class="complete-task"><i class="fa fa-check"></i></button>
                        <span class="tooltiptext">Mark Complete</span>
                    </div>
                    <div class="tooltip">
                        <button class="delete-task"><i class="fa fa-trash"></i></button>
                        <span class="tooltiptext">Delete task</span>
                    </div>
                </div>
            </li>`;

        const $task = $(taskHtml).hide();
        $('#task-list').append($task);
        $task.fadeIn();

        // Mark task as complete
        $task.find('.complete-task').click(function() {
            const $taskElement = $(this).closest('.task');
            $taskElement.toggleClass('completed');
            if ($taskElement.hasClass('completed')) {
                $taskElement.find('.edit-task').remove();
            } else {
                const $editButton = $('<button class="edit-task"><i class="fa fa-edit"></i></button>');
                $editButton.click(editTaskHandler);
                $(this).before($editButton);
            }
        });

        // Delete task
        $task.find('.delete-task').click(function() {
            $(this).closest('.task').fadeOut(function() {
                $(this).remove();
            });
        });

        // Edit task
        $task.find('.edit-task').click(editTaskHandler);
    }

    // Function to edit the task
    function editTaskHandler() {
        const $taskName = $(this).closest('.task').find('.task-name');
        const currentName = $taskName.text();
        const newName = prompt("Edit task name:", currentName);
        if (newName) {
            $taskName.text(newName);
        }
    }

    // Filter tasks based on the status (all, completed, pending)
    function filterTasks(filter) {
        $('.task').each(function() {
            const isCompleted = $(this).hasClass('completed');
            switch (filter) {
                case 'all':
                    $(this).show();
                    break;
                case 'completed':
                    isCompleted ? $(this).show() : $(this).hide();
                    break;
                case 'pending':
                    isCompleted ? $(this).hide() : $(this).show();
                    break;
            }
        });
    }
});
