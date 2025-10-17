Add-Type -AssemblyName System.Windows.Forms

Write-Host "Stay Awake script started" -ForegroundColor Green

while ($true) {
    # Toggle NumLock harmlessly
    $numlock = [console]::NumberLock
    [System.Windows.Forms.SendKeys]::SendWait("{NUMLOCK}")
    Start-Sleep -Milliseconds 100
    [System.Windows.Forms.SendKeys]::SendWait("{NUMLOCK}")  # restore original state

    Start-Sleep 240
}
