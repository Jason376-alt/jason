local function isWhitelisted(player)
    local success, result = pcall(function()
        local response = game:HttpGet("https://raw.githubusercontent.com/AKadminlol/AK-ADMIN/refs/heads/main/AK%20ADMIN.json")
        local HttpService = game:GetService("HttpService")
        local data = HttpService:JSONDecode(response)

        print("Fetched whitelist data: ", data) -- Debugging log
        if data and data.whitelisted then
            local isInWhitelist = table.find(data.whitelisted, player.Name) ~= nil
            print("Player", player.Name, "whitelisted:", isInWhitelist) -- Debugging log
            return isInWhitelist
        end
        return false
    end)

    if not success then
        warn("Failed to fetch whitelist data for player:", player.Name)
    end

    return success and result
end

local player = game.Players.LocalPlayer

local Advertisers = {"Vlafz195", "6736_45", "goekaycool", "goekayball", "goekayball2"}

local FreeTrial = {}

local Scripters = {"GYATT_DAMN1", "328ml", "29Kyooo", "BloxiAstra", "ImOn_ValveIndex"}

local Owners = {"Xeni_he07", "AliKhammas1234", "AliKhammas", "AK_ADMEN1", "YournothimbuddyXD", "AK_ADMEN2"}

local GMS = {"victorwielki"}

local AKStaff = {"goekaycool"}

-- Function to create tags for different ranks
local function createTag(player, text)
    local function attachTagToHead(character)
        local head = character:WaitForChild("Head", 5)
        if not head then return end
        
        -- Remove any existing tag to avoid duplicates
        local existingTag = head:FindFirstChild("RankTag")
        if existingTag then
            return -- Exit if the tag already exists
        end

        -- Create the new tag
        local tag = Instance.new("BillboardGui")
        tag.Name = "RankTag"
        tag.Size = UDim2.new(0, 200, 0, 50)
        tag.StudsOffset = Vector3.new(0, 2.5, 0)
        tag.AlwaysOnTop = true
        tag.MaxDistance = math.huge

        -- Create the shadow
        local shadowLabel = Instance.new("TextLabel")
        shadowLabel.Size = UDim2.new(1, 0, 1, 0)
        shadowLabel.BackgroundTransparency = 1
        shadowLabel.Text = text
        shadowLabel.TextColor3 = Color3.new(0, 0, 0) -- Shadow color
        shadowLabel.TextStrokeTransparency = 0 -- Shadow stroke
        shadowLabel.Font = Enum.Font.SourceSansBold
        shadowLabel.TextSize = 20
        shadowLabel.Position = UDim2.new(0, 1, 0, 1) -- Offset for shadow
        shadowLabel.Parent = tag

        -- Create the main label
        local label = Instance.new("TextLabel")
        label.Size = UDim2.new(1, 0, 1, 0)
        label.BackgroundTransparency = 1
        label.Text = text
        label.TextColor3 = Color3.new(1, 1, 1)
        label.TextStrokeTransparency = 0.5
        label.Font = Enum.Font.SourceSansBold
        label.TextSize = 20
        label.Parent = tag

        -- Attach the tag to the player's head
        tag.Parent = head

        -- Update transparency based on distance
        game:GetService("RunService").RenderStepped:Connect(function()
            if player.Character and player.Character:FindFirstChild("Head") and game.Players.LocalPlayer.Character then
                local distance = (player.Character.Head.Position - game.Players.LocalPlayer.Character.Head.Position).Magnitude
                if distance > 49 then
                    local transparency = math.min((distance - 25) / 25, 0.5)
                    label.TextTransparency = transparency
                    shadowLabel.TextTransparency = transparency -- sync with the main label
                else
                    label.TextTransparency = 0
                    shadowLabel.TextTransparency = 0 -- sync with the main label
                end
            end
        end)
    end

    -- Apply the tag if the character is loaded
    if player.Character then
        attachTagToHead(player.Character)
    end

    -- Apply the tag every time the character respawns or resets
    player.CharacterAdded:Connect(function(character)
        attachTagToHead(character)
    end)
end

-- Function to check player rank and apply the appropriate tag
local function applyPlayerTag(player)
    -- Check for each role and apply the corresponding tag if the player is in that list
    if table.find(Owners, player.Name) then
        createTag(player, "AK OWNER ")
    elseif table.find(Scripters, player.Name) then
        createTag(player, "AK SCRIPTER ")
    elseif table.find(GMS, player.Name) then
        createTag(player, "AK GM ")
    elseif table.find(AKStaff, player.Name) then
        createTag(player, "AK STAFF ")
    elseif table.find(Advertisers, player.Name) then
        createTag(player, "AK ADVERTISER ")
    elseif table.find(FreeTrial, player.Name) then
        createTag(player, "AK TRIAL ")
    elseif isWhitelisted(player) then
        createTag(player, "AK USER")
    end
end

-- Apply tags to existing players immediately
for _, player in pairs(game.Players:GetPlayers()) do
    applyPlayerTag(player)
end

-- Apply tags to new players who join
game.Players.PlayerAdded:Connect(function(plr)
    applyPlayerTag(plr)
end)
