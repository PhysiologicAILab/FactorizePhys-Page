# FactorizePhys: Matrix Factorization for Multidimensional Attention in Remote Physiological Sensing

<div align="center">

[![NeurIPS 2024](https://img.shields.io/badge/NeurIPS-2024-blue.svg)](https://neurips.cc/Conferences/2024)
[![Paper](https://img.shields.io/badge/Paper-PDF-red.svg)](/assets/docs/factorizephys-paper.pdf)
[![Code](https://img.shields.io/badge/Code-GitHub-green.svg)](https://github.com/PhysiologicAILab/FactorizePhys)
[![Website](https://img.shields.io/badge/Website-GitHub%20Pages-purple.svg)](https://physiologicailab.github.io/FactorizePhys-Page)

</div>

## 🎯 Overview

This repository hosts the GitHub Pages website for **FactorizePhys**, a novel method for remote photoplethysmography (rPPG) published at NeurIPS 2024. The work introduces **Factorized Self-Attention Module (FSAM)** that leverages nonnegative matrix factorization to jointly compute multidimensional attention across spatial, temporal, and channel dimensions.

## 🚀 Key Contributions

- **Novel Attention Mechanism**: FSAM jointly computes spatial-temporal-channel attention using matrix factorization
- **Superior Generalization**: State-of-the-art cross-dataset performance across all major rPPG datasets
- **Computational Efficiency**: ~50x fewer parameters than existing methods while maintaining competitive performance

## 📊 Results Highlights

- **67% reduction** in Mean Absolute Error (MAE) compared to SOTA methods
- **15% improvement** in Signal-to-Noise Ratio (SNR)
- **51K parameters** vs. 7.3M in competing methods
- **0.998 correlation** for heart rate estimation

<!-- ## 🏗️ Website Development -->

<!-- This website is built using:

- **HTML5** with semantic structure
- **CSS3** with modern features (Grid, Flexbox, Gradients, Backdrop filters)
- **Vanilla JavaScript** for interactivity and animations
- **Responsive design** for mobile and desktop compatibility
- **GitHub Pages** for hosting -->

## 📝 Authors

- **Jitesh Joshi** - University College London, UK
- **Sos S. Agaian** - City University of New York, USA  
- **Youngjun Cho** - University College London, UK

## 🎓 Citation

```bibtex
@inproceedings{joshi2024factorizephys,
    title={FactorizePhys: Matrix Factorization for Multidimensional Attention in Remote Physiological Sensing},
    author={Jitesh Joshi and Sos Agaian and Youngjun Cho},
    booktitle={The Thirty-eighth Annual Conference on Neural Information Processing Systems},
    year={2024},
    url={https://openreview.net/forum?id=qrfp4eeZ47}
}
