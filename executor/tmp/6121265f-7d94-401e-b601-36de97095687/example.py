import matplotlib
import matplotlib.pyplot as plt
from io import BytesIO
import base64
import os
matplotlib.use('Agg')
image = BytesIO()
plt.plot([1, 2, 3])
plt.savefig(image, format='png')
print(base64.b64encode(image.getvalue()).decode('ascii'))