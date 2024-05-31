<?php
// File to store the counter value
$counterFile = 'counter.txt';

// Read the current counter value
if (file_exists($counterFile)) {
    $count = file_get_contents($counterFile);
    $count = intval($count) + 1;
} else {
    $count = 1;
}

// Write the new counter value
file_put_contents($counterFile, $count);

// Return the new count
echo $count;
?>
