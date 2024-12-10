-- Services
local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")

-- Variables
local player = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")
local rootPart = character:WaitForChild("HumanoidRootPart")

local flying = false
local flySpeed = 700
local TOGGLE_KEY = Enum.KeyCode.X
local isSelectingKeybind = false
local noclip = false
local minSpeed = 1
local maxSpeed = 5000

-- Add Workspace Gravity reference
local workspace = game:GetService("Workspace")
local defaultGravity = workspace.Gravity

-- GUI Creation
local ScreenGui = Instance.new("ScreenGui")
local MainFrame = Instance.new("Frame")
local Shadow = Instance.new("ImageLabel")
local Container = Instance.new("Frame")
local Title = Instance.new("TextLabel")
local ToggleButton = Instance.new("TextButton")
local SpeedSlider = Instance.new("TextButton")
local KeybindButton = Instance.new("TextButton")
local StatusIndicator = Instance.new("Frame")

-- GUI Styling
ScreenGui.Parent = player.PlayerGui
ScreenGui.ResetOnSpawn = false

-- Main Container
MainFrame.Name = "MainFrame"
MainFrame.Size = UDim2.new(0, 220, 0, 240)
MainFrame.Position = UDim2.new(0.85, 0, 0.4, 0)
MainFrame.BackgroundColor3 = Color3.fromRGB(25, 25, 25)
MainFrame.BorderSizePixel = 0
MainFrame.Parent = ScreenGui

-- Container for Content (this holds all the buttons)
Container.Name = "Container"
Container.Size = UDim2.new(1, -20, 1, -20)
Container.Position = UDim2.new(0, 10, 0, 10)
Container.BackgroundTransparency = 1
Container.Parent = MainFrame

-- Title
Title.Size = UDim2.new(1, 0, 0, 35)
Title.Position = UDim2.new(0, 0, 0, 0)
Title.BackgroundTransparency = 1
Title.Font = Enum.Font.GothamBold
Title.Text = "SUPERMAN FLY"
Title.TextColor3 = Color3.fromRGB(255, 255, 255)
Title.TextSize = 18
Title.Parent = Container

-- Status Indicator (the red/green dot)
StatusIndicator.Size = UDim2.new(0, 10, 0, 10)
StatusIndicator.Position = UDim2.new(1, -15, 0, 13)
StatusIndicator.BackgroundColor3 = Color3.fromRGB(255, 75, 75)
StatusIndicator.Parent = Container

-- Buttons
ToggleButton.Parent = Container
ToggleButton.Position = UDim2.new(0, 0, 0, 45)
ToggleButton.Size = UDim2.new(1, 0, 0, 40)
ToggleButton.BackgroundColor3 = Color3.fromRGB(255, 75, 75)
ToggleButton.Text = "FLY: OFF"

SpeedSlider.Parent = Container
SpeedSlider.Position = UDim2.new(0, 0, 0, 95)
SpeedSlider.Size = UDim2.new(1, 0, 0, 40)
SpeedSlider.BackgroundColor3 = Color3.fromRGB(45, 45, 50)
SpeedSlider.Text = "SPEED: 700"

KeybindButton.Parent = Container
KeybindButton.Position = UDim2.new(0, 0, 0, 145)
KeybindButton.Size = UDim2.new(1, 0, 0, 40)
KeybindButton.BackgroundColor3 = Color3.fromRGB(45, 45, 50)
KeybindButton.Text = "KEYBIND: X"

-- Style all buttons
for _, button in pairs({ToggleButton, SpeedSlider, KeybindButton}) do
    button.Font = Enum.Font.GothamBold
    button.TextSize = 14
    button.TextColor3 = Color3.fromRGB(255, 255, 255)
    button.BorderSizePixel = 0
    
    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, 6)
    corner.Parent = button
end

-- Add corner to main frame
local mainCorner = Instance.new("UICorner")
mainCorner.CornerRadius = UDim.new(0, 8)
mainCorner.Parent = MainFrame

-- Add corner to status indicator
local statusCorner = Instance.new("UICorner")
statusCorner.CornerRadius = UDim.new(1, 0)
statusCorner.Parent = StatusIndicator

-- Enhanced Shadow
Shadow.Name = "Shadow"
Shadow.AnchorPoint = Vector2.new(0.5, 0.5)
Shadow.BackgroundTransparency = 1
Shadow.Position = UDim2.new(0.5, 0, 0.5, 0)
Shadow.Size = UDim2.new(1, 50, 1, 50)
Shadow.Image = "rbxassetid://5554236805"
Shadow.ImageColor3 = Color3.fromRGB(0, 0, 0)
Shadow.ImageTransparency = 0.3
Shadow.Parent = MainFrame

-- Add corners to all buttons
for _, button in pairs({MainFrame, ToggleButton, SpeedSlider, KeybindButton}) do
    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, 8)
    corner.Parent = button
end

-- Add corners and effects to all buttons
for _, button in pairs({MainFrame, ToggleButton, SpeedSlider, KeybindButton}) do
    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, 8)
    corner.Parent = button
    
    -- Add hover effect
    if button ~= MainFrame then
        local hover = false
        button.MouseEnter:Connect(function()
            hover = true
            TweenService:Create(button, TweenInfo.new(0.2), {
                BackgroundColor3 = button.BackgroundColor3:Lerp(Color3.fromRGB(255, 255, 255), 0.1)
            }):Play()
        end)
        
        button.MouseLeave:Connect(function()
            hover = false
            TweenService:Create(button, TweenInfo.new(0.2), {
                BackgroundColor3 = hover and button.BackgroundColor3:Lerp(Color3.fromRGB(255, 255, 255), 0.1) or 
                                  (button == ToggleButton and (flying and Color3.fromRGB(75, 255, 75) or Color3.fromRGB(255, 75, 75)) or 
                                  Color3.fromRGB(45, 45, 50))
            }):Play()
        end)
    end
end

-- Add click effect to buttons
for _, button in pairs({ToggleButton, SpeedSlider, KeybindButton}) do
    button.MouseButton1Down:Connect(function()
        TweenService:Create(button, TweenInfo.new(0.1), {
            Size = UDim2.new(button.Size.X.Scale, button.Size.X.Offset, button.Size.Y.Scale, button.Size.Y.Offset - 2)
        }):Play()
    end)
    
    button.MouseButton1Up:Connect(function()
        TweenService:Create(button, TweenInfo.new(0.1), {
            Size = UDim2.new(button.Size.X.Scale, button.Size.X.Offset, button.Size.Y.Scale, button.Size.Y.Offset + 2)
        }):Play()
    end)
end

-- Add to Variables section
local ctrl = {f = 0, b = 0, l = 0, r = 0}
local lastctrl = {f = 0, b = 0, l = 0, r = 0}
local keyConnections = {}

-- Add animation functions
local currentAnim = nil
local function PlayAnim(id, time, speed)
    pcall(function()
        if currentAnim then
            currentAnim:Stop(0.1)
        end
        
        player.Character.Animate.Disabled = true
        local hum = player.Character.Humanoid
        local animtrack = hum:GetPlayingAnimationTracks()
        for i, track in pairs(animtrack) do
            track:Stop()
        end
        
        local Anim = Instance.new("Animation")
        Anim.AnimationId = "rbxassetid://"..id
        local loadanim = hum:LoadAnimation(Anim)
        loadanim:Play()
        loadanim.TimePosition = time
        loadanim:AdjustSpeed(speed)
        
        currentAnim = loadanim
        
        loadanim.Stopped:Connect(function()
            player.Character.Animate.Disabled = false
            for i, track in pairs(animtrack) do
                track:Stop()
            end
        end)
    end)
end

local function StopAnim()
    player.Character.Animate.Disabled = false
    local animtrack = player.Character.Humanoid:GetPlayingAnimationTracks()
    for i, track in pairs(animtrack) do
        track:Stop()
    end
end

-- Add to Variables section
local lastDirection = "none"
local turnTilt = 0
local maxTilt = 45 -- Maximum tilt angle for turns

-- Update the updateFly function to include banking turns
local function updateFly()
    if not flying then return end
    
    local camera = workspace.CurrentCamera
    local speed = 0
    
    -- Create BodyGyro and BodyVelocity if they don't exist
    if not rootPart:FindFirstChild("FlyGyro") then
        local bg = Instance.new("BodyGyro")
        bg.Name = "FlyGyro"
        bg.P = 9e4
        bg.maxTorque = Vector3.new(9e9, 9e9, 9e9)
        bg.CFrame = rootPart.CFrame
        bg.Parent = rootPart
        
        local bv = Instance.new("BodyVelocity")
        bv.Name = "FlyVelocity"
        bv.Velocity = Vector3.new(0, 0.1, 0)
        bv.MaxForce = Vector3.new(9e9, 9e9, 9e9)
        bv.Parent = rootPart
    end
    
    local bg = rootPart.FlyGyro
    local bv = rootPart.FlyVelocity
    
    -- Calculate speed with smoother acceleration
    if ctrl.l + ctrl.r ~= 0 or ctrl.f + ctrl.b ~= 0 then
        speed = speed + flySpeed * 0.15
        if speed > flySpeed then
            speed = flySpeed
        end
    elseif not (ctrl.l + ctrl.r ~= 0 or ctrl.f + ctrl.b ~= 0) and speed ~= 0 then
        speed = speed - flySpeed * 0.08
        if speed < 0 then
            speed = 0
        end
    end
    
    -- Calculate banking angle for turns
    local targetTilt = 0
    if ctrl.f == 1 then
        if ctrl.l == -1 then
            targetTilt = maxTilt
            if lastDirection ~= "left" then
                lastDirection = "left"
                PlayAnim(10714177846, 4.65, 0)
            end
        elseif ctrl.r == 1 then
            targetTilt = -maxTilt
            if lastDirection ~= "right" then
                lastDirection = "right"
                PlayAnim(10714177846, 4.65, 0)
            end
        else
            lastDirection = "none"
            if currentAnim and currentAnim.Animation.AnimationId:match("10147823318") then
                PlayAnim(10714177846, 4.65, 0)
            end
        end
    end
    
    -- Smooth out the banking animation
    turnTilt = turnTilt + (targetTilt - turnTilt) * 0.1
    
    -- Calculate velocity
    if (ctrl.l + ctrl.r) ~= 0 or (ctrl.f + ctrl.b) ~= 0 then
        bv.Velocity = ((camera.CoordinateFrame.lookVector * (ctrl.f + ctrl.b)) + 
            ((camera.CoordinateFrame * CFrame.new(ctrl.l + ctrl.r, (ctrl.f + ctrl.b) * 0.2, 0).p) - 
            camera.CoordinateFrame.p)) * speed
        lastctrl = {f = ctrl.f, b = ctrl.b, l = ctrl.l, r = ctrl.r}
    elseif (ctrl.l + ctrl.r) == 0 and (ctrl.f + ctrl.b) == 0 and speed ~= 0 then
        bv.Velocity = ((camera.CoordinateFrame.lookVector * (lastctrl.f + lastctrl.b)) + 
            ((camera.CoordinateFrame * CFrame.new(lastctrl.l + lastctrl.r, (lastctrl.f + lastctrl.b) * 0.2, 0).p) - 
            camera.CoordinateFrame.p)) * speed
    else
        bv.Velocity = Vector3.new(0, 0.1, 0)
    end
    
    -- Update gyro with banking effect
    if ctrl.f == 1 then
        bg.CFrame = camera.CoordinateFrame 
            * CFrame.Angles(-math.rad(90), 0, math.rad(turnTilt)) -- Add roll angle for banking
    else
        bg.CFrame = camera.CoordinateFrame 
            * CFrame.Angles(-math.rad((ctrl.f + ctrl.b) * 50 * speed/flySpeed), 0, math.rad(turnTilt))
    end
end

-- Update button colors (much brighter)
local function enhanceGUI()
    -- Add gradient background to MainFrame
    local UIGradient = Instance.new("UIGradient")
    UIGradient.Color = ColorSequence.new({
        ColorSequenceKeypoint.new(0, Color3.fromRGB(45, 45, 50)),
        ColorSequenceKeypoint.new(1, Color3.fromRGB(35, 35, 40))
    })
    UIGradient.Rotation = 45
    UIGradient.Parent = MainFrame

    -- Remove dark gradients from buttons
    for _, button in pairs({ToggleButton, SpeedSlider, KeybindButton}) do
        -- Set default colors without dark overlays
        if button == ToggleButton then
            button.BackgroundColor3 = Color3.fromRGB(255, 75, 75)
        else
            button.BackgroundColor3 = Color3.fromRGB(45, 45, 50)
        end
    end
end

-- Add to Variables section
local isMobile = UserInputService.TouchEnabled
local TouchGui = nil
local TouchControls = nil
local TouchActive = false

-- Add after GUI creation but before button styling
if isMobile then
    -- Create Touch Controls
    TouchGui = Instance.new("ScreenGui")
    TouchGui.Name = "FlyTouchControls"
    TouchGui.ResetOnSpawn = false
    TouchGui.Parent = player.PlayerGui

    TouchControls = Instance.new("ImageButton")
    TouchControls.Size = UDim2.new(0, 150, 0, 150)
    TouchControls.Position = UDim2.new(0.1, 0, 0.5, 0)
    TouchControls.AnchorPoint = Vector2.new(0.5, 0.5)
    TouchControls.BackgroundTransparency = 0.5
    TouchControls.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
    TouchControls.Image = "rbxassetid://8997446837" -- Joystick image
    TouchControls.ImageTransparency = 0.5
    TouchControls.Visible = false
    TouchControls.Parent = TouchGui

    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(1, 0)
    corner.Parent = TouchControls
end

-- Update toggleFlight function
local function toggleFlight()
    flying = not flying
    ToggleButton.Text = flying and "FLY: ON" or "FLY: OFF"
    
    local targetColor = flying and Color3.fromRGB(75, 255, 75) or Color3.fromRGB(255, 75, 75)
    TweenService:Create(ToggleButton, TweenInfo.new(0.3), {
        BackgroundColor3 = targetColor
    }):Play()
    
    if flying then
        workspace.Gravity = 0
        humanoid.PlatformStand = true
        
        -- Play initial idle animation
        PlayAnim(10714347256, 4, 0)
        
        -- Simplified key handlers with forward animation for all directional movement
        table.insert(keyConnections, UserInputService.InputBegan:Connect(function(input)
            if UserInputService:GetFocusedTextBox() then return end
            
            if input.KeyCode == Enum.KeyCode.W then
                ctrl.f = 1
                PlayAnim(10714177846, 4.65, 0)  -- Forward animation
            elseif input.KeyCode == Enum.KeyCode.S then
                ctrl.b = -1
                if ctrl.f == 0 then
                    PlayAnim(10147823318, 4.11, 0)  -- Back animation
                end
            elseif input.KeyCode == Enum.KeyCode.A then
                ctrl.l = -1
                if ctrl.f == 1 then
                    PlayAnim(10714177846, 4.65, 0)  -- Forward animation while turning
                end
            elseif input.KeyCode == Enum.KeyCode.D then
                ctrl.r = 1
                if ctrl.f == 1 then
                    PlayAnim(10714177846, 4.65, 0)  -- Forward animation while turning
                end
            end
        end))
        
        table.insert(keyConnections, UserInputService.InputEnded:Connect(function(input)
            if input.KeyCode == Enum.KeyCode.W then
                ctrl.f = 0
                if ctrl.b == 0 then
                    PlayAnim(10714347256, 4, 0)  -- Idle animation
                else
                    PlayAnim(10147823318, 4.11, 0)  -- Back animation if S is held
                end
            elseif input.KeyCode == Enum.KeyCode.S then
                ctrl.b = 0
                if ctrl.f == 1 then
                    PlayAnim(10714177846, 4.65, 0)  -- Forward animation if W is held
                else
                    PlayAnim(10714347256, 4, 0)  -- Idle animation
                end
            elseif input.KeyCode == Enum.KeyCode.A then
                ctrl.l = 0
                if ctrl.f == 1 then
                    PlayAnim(10714177846, 4.65, 0)  -- Keep forward animation if W is held
                end
            elseif input.KeyCode == Enum.KeyCode.D then
                ctrl.r = 0
                if ctrl.f == 1 then
                    PlayAnim(10714177846, 4.65, 0)  -- Keep forward animation if W is held
                end
            end
        end))
        
        RunService:BindToRenderStep("Fly", Enum.RenderPriority.Camera.Value, updateFly)

        if isMobile then
            TouchControls.Visible = true
            
            -- Handle touch controls
            TouchControls.InputBegan:Connect(function(input)
                if input.UserInputType == Enum.UserInputType.Touch then
                    TouchActive = true
                    while TouchActive do
                        local touchPos = input.Position
                        local center = TouchControls.AbsolutePosition + 
                            TouchControls.AbsoluteSize/2
                        local delta = (touchPos - center) / (TouchControls.AbsoluteSize.X/2)
                        
                        -- Update controls based on touch position
                        ctrl.f = delta.Y < -0.3 and 1 or 0
                        ctrl.b = delta.Y > 0.3 and -1 or 0
                        ctrl.l = delta.X < -0.3 and -1 or 0
                        ctrl.r = delta.X > 0.3 and 1 or 0
                        
                        -- Update animation based on movement
                        if ctrl.f == 1 then
                            PlayAnim(10714177846, 4.65, 0)
                        elseif ctrl.b == -1 then
                            PlayAnim(10147823318, 4.11, 0)
                        end
                        
                        wait()
                    end
                end
            end)
            
            TouchControls.InputEnded:Connect(function(input)
                if input.UserInputType == Enum.UserInputType.Touch then
                    TouchActive = false
                    ctrl = {f = 0, b = 0, l = 0, r = 0}
                    PlayAnim(10714347256, 4, 0)  -- Return to idle animation
                end
            end)
        end
    else
        workspace.Gravity = defaultGravity
        humanoid.PlatformStand = false
        
        StopAnim()
        
        if rootPart:FindFirstChild("FlyGyro") then
            rootPart.FlyGyro:Destroy()
        end
        if rootPart:FindFirstChild("FlyVelocity") then
            rootPart.FlyVelocity:Destroy()
        end
        
        ctrl = {f = 0, b = 0, l = 0, r = 0}
        lastctrl = {f = 0, b = 0, l = 0, r = 0}
        
        for _, connection in pairs(keyConnections) do
            connection:Disconnect()
        end
        table.clear(keyConnections)
        
        RunService:UnbindFromRenderStep("Fly")
        
        if isMobile then
            TouchControls.Visible = false
            TouchActive = false
        end
    end
end

-- Update Toggle Function with a separate function
ToggleButton.MouseButton1Click:Connect(toggleFlight)

-- Update Speed Slider
SpeedSlider.MouseButton1Down:Connect(function()
    local mouse = game:GetService("Players").LocalPlayer:GetMouse()
    local moveConnection
    local releaseConnection
    
    local function updateSpeed(mouseX)
        local relativeX = math.clamp((mouseX - SpeedSlider.AbsolutePosition.X) / SpeedSlider.AbsoluteSize.X, 0, 1)
        flySpeed = math.floor(minSpeed + (maxSpeed - minSpeed) * relativeX)
        if flySpeed < 10 then flySpeed = 10 end  -- Minimum speed threshold
        SpeedSlider.Text = "SPEED: " .. flySpeed
        
        -- Update slider color based on speed
        local speedColor = Color3.fromRGB(
            math.floor(255 - (relativeX * 180)),
            math.floor(75 + (relativeX * 180)),
            75
        )
        TweenService:Create(SpeedSlider, TweenInfo.new(0.1), {
            BackgroundColor3 = speedColor
        }):Play()
    end
    
    updateSpeed(mouse.X)
    moveConnection = mouse.Move:Connect(function()
        updateSpeed(mouse.X)
    end)
    
    releaseConnection = UserInputService.InputEnded:Connect(function(input)
        if input.UserInputType == Enum.UserInputType.MouseButton1 then
            if moveConnection then moveConnection:Disconnect() end
            if releaseConnection then releaseConnection:Disconnect() end
        end
    end)
end)

-- Update Keybind System
local function handleKeybind(input)
    if not isSelectingKeybind and input.KeyCode == TOGGLE_KEY then
        toggleFlight()
    end
end

-- Update Keybind Button
KeybindButton.MouseButton1Click:Connect(function()
    isSelectingKeybind = true
    KeybindButton.Text = "PRESS ANY KEY..."
    KeybindButton.BackgroundColor3 = Color3.fromRGB(75, 255, 75)
end)

-- Update Input Handler
UserInputService.InputBegan:Connect(function(input, gameProcessed)
    if gameProcessed then return end
    
    if isSelectingKeybind then
        if input.UserInputType == Enum.UserInputType.Keyboard then
            local blacklistedKeys = {
                Enum.KeyCode.Unknown,
                Enum.KeyCode.LeftShift,
                Enum.KeyCode.RightShift,
                Enum.KeyCode.LeftControl,
                Enum.KeyCode.RightControl,
                Enum.KeyCode.LeftAlt,
                Enum.KeyCode.RightAlt,
                Enum.KeyCode.LeftSuper,
                Enum.KeyCode.RightSuper
            }
            
            -- Check if key is blacklisted
            for _, blockedKey in ipairs(blacklistedKeys) do
                if input.KeyCode == blockedKey then
                    return
                end
            end
            
            -- Set new keybind
            isSelectingKeybind = false
            TOGGLE_KEY = input.KeyCode
            KeybindButton.Text = "KEYBIND: " .. input.KeyCode.Name
            KeybindButton.BackgroundColor3 = Color3.fromRGB(45, 45, 50)
        end
    else
        handleKeybind(input)
    end
end)

-- Add Cancel Keybind Selection
UserInputService.InputBegan:Connect(function(input)
    if isSelectingKeybind and input.UserInputType == Enum.UserInputType.MouseButton1 then
        local mousePosition = UserInputService:GetMouseLocation()
        local buttonPosition = KeybindButton.AbsolutePosition
        local buttonSize = KeybindButton.AbsoluteSize
        
        -- Check if click is outside the button
        if mousePosition.X < buttonPosition.X or 
           mousePosition.X > buttonPosition.X + buttonSize.X or 
           mousePosition.Y < buttonPosition.Y or 
           mousePosition.Y > buttonPosition.Y + buttonSize.Y then
            
            isSelectingKeybind = false
            KeybindButton.Text = "KEYBIND: " .. TOGGLE_KEY.Name
            KeybindButton.BackgroundColor3 = Color3.fromRGB(45, 45, 50)
        end
    end
end)

-- Character Added Handler
player.CharacterAdded:Connect(function(newCharacter)
    character = newCharacter
    humanoid = character:WaitForChild("Humanoid")
    rootPart = character:WaitForChild("HumanoidRootPart")
    
    if flying then
        workspace.Gravity = defaultGravity
        toggleFlight()
    end
end)

-- Make GUI draggable
local dragging
local dragInput
local dragStart
local startPos

local function update(input)
    local delta = input.Position - dragStart
    MainFrame.Position = UDim2.new(startPos.X.Scale, startPos.X.Offset + delta.X,
        startPos.Y.Scale, startPos.Y.Offset + delta.Y)
end

MainFrame.InputBegan:Connect(function(input)
    if input.UserInputType == Enum.UserInputType.MouseButton1 then
        dragging = true
        dragStart = input.Position
        startPos = MainFrame.Position
        
        input.Changed:Connect(function()
            if input.UserInputState == Enum.UserInputState.End then
                dragging = false
            end
        end)
    end
end)

MainFrame.InputChanged:Connect(function(input)
    if input.UserInputType == Enum.UserInputType.MouseMovement then
        dragInput = input
    end
end)

UserInputService.InputChanged:Connect(function(input)
    if input == dragInput and dragging then
        update(input)
    end
end)

-- Call the enhance function after creating the GUI
enhanceGUI()

-- Add smooth transitions for button clicks
for _, button in pairs({ToggleButton, SpeedSlider, KeybindButton}) do
    button.MouseButton1Down:Connect(function()
        TweenService:Create(button, TweenInfo.new(0.1), {
            Size = UDim2.new(button.Size.X.Scale, button.Size.X.Offset, button.Size.Y.Scale, button.Size.Y.Offset - 2)
        }):Play()
    end)
    
    button.MouseButton1Up:Connect(function()
        TweenService:Create(button, TweenInfo.new(0.1), {
            Size = UDim2.new(button.Size.X.Scale, button.Size.X.Offset, button.Size.Y.Scale, button.Size.Y.Offset + 2)
        }):Play()
    end)
end
