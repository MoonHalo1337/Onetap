var print = function(a)
{
    Cheat.PrintLog(""+a, [255, 255, 255, 200]);
}

var get_color = function()
{
    return (UI.GetColor(["Visuals", "Chams", "Self", "Visible material color"]));
}

var set_color = function(v)
{
    return (UI.SetColor(["Visuals", "Chams", "Self", "Visible material color"], v));
}

var get_scoped = function(ent)
{
    return Entity.GetProp(ent, "CCSPlayer", "m_bIsScoped");
}

var g_default_value = 255/4;
var g_default_speed = 3;
var g_color = get_color();
var g_alpha = get_color()[3];
var g_old_alpha = get_color()[3];
var g_run_alpha = false;

var on_color_change = function()
{
    g_color = get_color();
    g_alpha = get_color()[3];
    g_old_alpha = get_color()[3];
}

UI.RegisterCallback(["Visuals", "Chams", "Self", "Visible material color"], "on_color_change");

var get_c_id = function(ent)
{
    return Entity.GetClassName(Entity.GetWeapon(ent));
}

var check_nade = function(index)
{
    var is_nade = false;
    switch (index)
    {
        case "CSensorGrenade":
            is_nade = true;
            break;
        case "CHEGrenade":
            is_nade = true;
            break;
        case "CDecoyGrenade":
            is_nade = true;
            break;
        case "CIncendiaryGrenade":
            is_nade = true;
            break;
        case "CMolotovGrenade":
            is_nade = true;
            break;
        case "CSmokeGrenade":
            is_nade = true;
            break;

        default:
            is_nade = false;
    }

    return is_nade;
}

var paint = function()
{
    if (!Entity.GetLocalPlayer() || !Entity.IsAlive(Entity.GetLocalPlayer())){
        return;
    }

    if (get_scoped(Entity.GetLocalPlayer()) || check_nade(get_c_id(Entity.GetLocalPlayer())))
    {
        g_run_alpha = true;
    }
    else
    {
        g_run_alpha = false;
    }

    if (g_run_alpha && g_alpha > g_default_value)
    {
        g_alpha = g_alpha - g_default_speed;
    }

    if (!g_run_alpha && g_alpha <= g_old_alpha)
    {
        g_alpha = g_alpha + g_default_speed;
    }

    //print(Entity.GetClassName(Entity.GetWeapon(Entity.GetLocalPlayer())))

    if ((!g_run_alpha && g_alpha <= g_old_alpha) || (g_run_alpha && g_alpha > g_default_value))
    {
        set_color([g_color[0], g_color[1], g_color[2], g_alpha]);
    }
}

Cheat.RegisterCallback("Draw", "paint");
