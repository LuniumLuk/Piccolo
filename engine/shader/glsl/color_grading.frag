#version 310 es

#extension GL_GOOGLE_include_directive : enable

#include "constants.h"

layout(input_attachment_index = 0, set = 0, binding = 0) uniform highp subpassInput in_color;

layout(set = 0, binding = 1) uniform sampler2D color_grading_lut_texture_sampler;

layout(location = 0) out highp vec4 out_color;

void main()
{
    highp ivec2 lut_tex_size = textureSize(color_grading_lut_texture_sampler, 0);
    highp float _COLORS      = float(lut_tex_size.y);

    highp vec4 color       = subpassLoad(in_color).rgba;

    highp float r_lut_coord = color.r * (_COLORS - 1.0);
    highp float g_lut_coord = color.g * (_COLORS - 1.0);
    highp float b_lut_coord = color.b * (_COLORS - 1.0);

    highp float size_x      = float(lut_tex_size.x);

    highp float u1 = (r_lut_coord + floor(b_lut_coord) * _COLORS) / size_x;
    highp float u2 = (r_lut_coord + ceil(b_lut_coord) * _COLORS) / size_x;
    highp float v = g_lut_coord / _COLORS;

    highp vec3 c1 = textureLod(color_grading_lut_texture_sampler, vec2(u1, v), 0.0).rgb;
    highp vec3 c2 = textureLod(color_grading_lut_texture_sampler, vec2(u2, v), 0.0).rgb;

    out_color = vec4(mix(c1, c2, fract(b_lut_coord)), 1.0);
}
