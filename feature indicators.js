var print = function(a)
{
    Cheat.PrintLog(""+a, [255, 255, 255, 200])
}

var g_size = 25;
var g_text_size = 0;
var start_x = 50; 
var start_y = 0;
var screen_y = Render.GetScreenSize()[1];

var draw_shadow_text = function(x, y, r, g, b, a, message)
{
    var font = Render.GetFont('Calibrib.ttf', g_size, true);
    Render.String(x+1, y+1, 0, message, [0, 0, 0, a], font);
    Render.String(x, y, 0, message, [r, g, b, a], font);
}

var draw_shadow_rect = function(x, y, w, h, c1, c2)
{
    Render.GradientRect( x, y, w, h, 1, c1, c2);
}

var draw_cool_shadow = function(x, y, w, h)
{
    draw_shadow_rect( x + w/2, y - h/4, w, h, [ 0, 0, 0, 60 ], [ 0, 0, 0, 0 ]);
    draw_shadow_rect( x - w/2, y - h/4, w, h, [ 0, 0, 0, 0 ], [ 0, 0, 0, 60 ]);
}

var indicator = function(c, text)
{
    g_text_size = Render.TextSize(text, Render.GetFont('Calibrib.ttf', g_size, true));

    draw_cool_shadow(start_x, screen_y*0.75 - start_y, g_text_size[0], g_size*2);
    draw_shadow_text(start_x, screen_y*0.75 - start_y, c[0], c[1], c[2], c[3], text);

    start_y = start_y + g_text_size[1]*2.5;
}

var get_NextAttack = function(ent)
{
    return Entity.GetProp(ent, "CBaseCombatCharacter", "m_flNextAttack", 0x2d80);
}

var get_dt = function()
{
    return (UI.GetValue(["Rage", "Exploits", "General", "Double tap"]) == 1) && (UI.GetValue(["Rage", "Exploits", "Keys", "Key assignment", "Double tap"]) == 1)
}

var get_md = function()
{
    return (UI.GetValue(["Rage", "General", "General", "Key assignment", "Damage override"]) == 1)
}

var get_dt_state = function()
{
    return (get_NextAttack(Entity.GetLocalPlayer()) < Globals.Curtime()) && (Exploit.GetCharge() == 1);
}

var paint = function()
{
    start_y = start_y - start_y;

    if ((get_dt())){
        indicator(get_dt_state() ? [255, 255, 255, 200] : [255, 0, 50, 255], "DT");
    }

    if (get_md()){
        indicator([255, 255, 255, 200], "MD");
    }
}

Cheat.RegisterCallback("Draw", "paint");