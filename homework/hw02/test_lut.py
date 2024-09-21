'''
a simple script to test how lut works
'''

import cv2
import numpy as np
import matplotlib.pyplot as plt

# lut_path = 'engine/asset/texture/lut/color_grading_LUT.jpg'
lut_path = 'engine/asset/texture/lut/color_grading_lut_01.png'
lut_img = cv2.imread(lut_path)
lut_img = cv2.cvtColor(lut_img, cv2.COLOR_BGR2RGB)

print(lut_img.shape)

w = lut_img.shape[0]
h = lut_img.shape[0]
d = lut_img.shape[1] // lut_img.shape[0]

print(f'lut dim: {w}x{h}x{d}')

test_path = 'homework/hw02/lenna.png'
test_img = cv2.imread(test_path)
test_img = cv2.cvtColor(test_img, cv2.COLOR_BGR2RGB)

def apply_color_grading(img, lut):
    w = lut.shape[0]
    h = lut.shape[0]
    d = lut.shape[1] // lut.shape[0]

    i = img.astype(np.float32) / 256
    i[..., 0] *= w
    i[..., 1] *= h
    i[..., 2] *= d

    # TODO trilinear interpolation
    i = np.floor(i).astype(np.int32)

    return lut[i[..., 1], i[..., 2] * d + i[..., 0]]

ret_img = apply_color_grading(test_img, lut_img)

plt.imshow(np.hstack((test_img, ret_img))), plt.show()