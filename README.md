---
language:
- en
- ar
tags:
- Islam
- Quran
- Ayahs
pretty_name: Quran-MD
size_categories:
- 100K<n<1M
---
# Quran MD 🕌

## Overview

This collection provides comprehensive audio recordings of the complete Quran (Holy Book of Islam) with multiple recitations and granular annotations. The dataset is organized into **two separate, specialized datasets** optimized for different use cases.

### Related Dataset Links

|#| Dataset | Focus | Samples | Hugging Face Link |
|-|---------|-------|---------|-------------------|
|1| **🎵 Ayah Dataset** | Verse-level recitations | 187,080 | [`Buraaq/quran-md-ayahs`](https://huggingface.co/datasets/Buraaq/quran-md-ayahs) |
|2| **📝 Word Dataset** | Individual word pronunciations | 77,429 | [`Buraaq/quran-md-words`](https://huggingface.co/datasets/Buraaq/quran-md-words) |

1. [`Buraaq/quran-md-ayahs`](https://huggingface.co/datasets/Buraaq/quran-md-ayahs)
2. [`Buraaq/quran-md-words`](https://huggingface.co/datasets/Buraaq/quran-md-words)

### Paper
**Quran-MD: A Fine-Grained Multimodal Dataset of the Quran** 
(Accepted at: 5th Muslims in ML Workshop co-located with NeurIPS 2025)

📄 **Paper Link:** [quran-md-paper](https://arxiv.org/abs/2601.17880)
### Abstract

> We present Quran-MD, a comprehensive multimodal dataset of the Qur’an that integrates textual, linguistic, and audio dimensions at the verse and word levels. For each verse (ayah), the dataset provides its original Arabic text, English translation, and phonetic transliteration. To capture the rich oral tradition of Qur’anic recitation, we include verse-level audio from 30 distinct reciters, reflecting diverse recitation styles and dialectical nuances. At the word level, each token is paired with its corresponding Arabic script, English translation, transliteration, and an aligned audio recording, allowing fine-grained analysis of pronunciation, phonology, and semantic context. This dataset supports various applications, including natural language processing, speech recognition, text-to-speech synthesis, linguistic analysis, and digital Islamic studies. Bridging text and audio modalities across multiple reciters, this dataset provides a unique resource to advance computational approaches to Qur’anic recitation and study. Beyond enabling tasks such as ASR, tajweed detection, and Qur’anic TTS, it lays the foundation for multimodal embeddings, semantic retrieval, style transfer, and personalized tutoring systems that can support both research and community applications.


## Collection Summary

- **🎵 Ayah-level Audio**: 187,080 MP3 files (complete verse recitations)
- **📝 Word-level Audio**: 77,429 MP3 files (individual word pronunciations)  
- **📊 Total Audio Files**: ~264,509 MP3 files across both datasets
- **🎤 Reciters**: 30 renowned Quranic reciters
- **📚 Surahs (Chapters)**: 114 complete surahs
- **📖 Unique Ayahs**: 6,236 verses (multiple reciter versions)
- **🌐 Languages**: Arabic (original), English (translation), Transliteration
- **🎧 Audio Quality**: Various bitrates (32kbps to 192kbps)


### Languages

- **Arabic** (Classical Arabic - Quranic Arabic)
- **English** (Translations)
- **Transliteration** (Romanized Arabic in Latin Script)

---

## Dataset Architecture

These are **two separate datasets**, not data splits. Each dataset has its own schema, size, and versioning.

### Ayah Dataset
**Repository**: `Buraaq/quran-md-ayahs`  
**Focus**: Complete ayah-level recitations  
**Size**: 187,080 samples  
**Use Cases**: Speech recognition, recitation learning, verse analysis

👉 **[View Quran-MD Ayah Dataset Documentation →](https://huggingface.co/datasets/Buraaq/quran-md-ayahs)**

### Word Dataset  
**Repository**: `Buraaq/quran-md-words`  
**Focus**: Individual word pronunciations  
**Size**: 77,429 samples  
**Use Cases**: Pronunciation training, linguistic analysis, word-level segmentation

👉 **[View Quran-MD Word Dataset Documentation →](https://huggingface.co/datasets/Buraaq/quran-md-words)**

> **💡 Architecture Decision**: We've separated these into individual datasets (rather than splits) because:
> - Different schemas optimized for different tasks
> - Independent versioning and updates
> - Easier discovery and focused documentation
> - Reduced download size for specific use cases

## Data Structure Format

### Folder Layout

```text
quran_audio_data/
├── audio/
│   ├── ayahs/
│   │   ├── abdurrahmaan_as_sudais/
│   │   │   ├── <surah_number><ayah_number>.mp3
│   │   │   ├── 001001.mp3
│   │   │   ├── 001002.mp3
│   │   │   ├── 001003.mp3
│   │   │   └── ...
│   │   ├── saood_ash_shuraym/
│   │   │   ├── 001001.mp3
│   │   │   ├── 001002.mp3
│   │   │   ├── 001003.mp3
│   │   │   └── ...
│   │   ├── yasser_ad_dussary/
│   │   │   ├── 001001.mp3
│   │   │   ├── 001002.mp3
│   │   │   ├── 001003.mp3
│   │   │   └── ...
│   │   └── ... (more reciters - 30 in total)
│   │
│   ├── words/
│   │   ├── <surah_number>_<ayah_number>_<word_number>.mp3
│   │   ├── 001_001_001.mp3
│   │   ├── 001_001_002.mp3
│   │   ├── 001_001_003.mp3
│   │   ├── 001_001_004.mp3
│   │   ├── 001_002_001.mp3
│   │   └── ... 
│
├── data/
│   ├── quran_.json
│   ├── missing_data.json
│   ├── reciters.json
│   ├── number_of_ayahs.json
│   ├── surahs.txt
│   └── number_of_verses.txt
│
└── README.md

```

---

## Data Format Example

```json
{
  "112": {
    "surah_name_ar": "الإخلاص",
    "surah_name_en": "Sincerity",
    "surah_name_tr": "Al-Ikhlaas",
    "ayah_count": 4,
    "ayahs": {
      "001": {
        "ayah_ar": "قُلْ هُوَ اللَّهُ أَحَدٌ",
        "ayah_en": "Say, \"He is Allah, [who is] One,",
        "ayah_tr": "qul huwa l-lahu aḥadun",
        "audio_ayah_path": {
          "saood_ash_shuraym": "audio/ayahs/saood_ash_shuraym/112001.mp3",
          "abdurrahmaan_as_sudais": "audio/ayahs/abdurrahmaan_as_sudais/112001.mp3",
          ...,
        },
        "words": [
          {
            "id": "001",
            "word_ar": "قُلْ",
            "word_en": "Say",
            "word_tr": "qul",
            "audio_word_path": "audio/words/112_001_001.mp3"
          },
          {
            "id": "002",
            "word_ar": "هُوَ",
            "word_en": "He",
            "word_tr": "huwa",
            "audio_word_path": "audio/words/112_001_002.mp3"
          },
          {
            "id": "003",
            "word_ar": "اللَّهُ",
            "word_en": "(is) Allah",
            "word_tr": "l-lahu",
            "audio_word_path": "audio/words/112_001_003.mp3"
          },
          {
            "id": "004",
            "word_ar": "أَحَدٌ",
            "word_en": "the One",
            "word_tr": "aḥadun",
            "audio_word_path": "audio/words/112_001_004.mp3"
          }
        ]
      },
      "002": {
        "ayah_ar": "اللَّهُ الصَّمَدُ",
        "ayah_en": "Allah, the Eternal Refuge.",
        "ayah_tr": "al-lahu l-ṣamadu",
        "audio_ayah_path": {
          "saood_ash_shuraym": "audio/ayahs/saood_ash_shuraym/112002.mp3",
          "abdurrahmaan_as_sudais": "audio/ayahs/abdurrahmaan_as_sudais/112002.mp3",
          ...,
        },
        "words": [
          {
            "id": "001",
            "word_ar": "اللَّهُ",
            "word_en": "Allah",
            "word_tr": "al-lahu",
            "audio_word_path": "audio/words/112_002_001.mp3"
          },
          {
            "id": "002",
            "word_ar": "الصَّمَدُ",
            "word_en": "the Eternal the Absolute",
            "word_tr": "l-ṣamadu",
            "audio_word_path": "audio/words/112_002_002.mp3"
          }
        ]
      },
      "003": {
        "ayah_ar": "لَمْ يَلِدْ وَلَمْ يُولَدْ",
        "ayah_en": "He neither begets nor is born,",
        "ayah_tr": "lam yalid walam yūlad",
        "audio_ayah_path": {
          "saood_ash_shuraym": "audio/ayahs/saood_ash_shuraym/112003.mp3",
          "abdurrahmaan_as_sudais": "audio/ayahs/abdurrahmaan_as_sudais/112003.mp3",
          ...,
        },
        "words": [
          {
            "id": "001",
            "word_ar": "لَمْ",
            "word_en": "Not",
            "word_tr": "lam",
            "audio_word_path": "audio/words/112_003_001.mp3"
          },
          {
            "id": "002",
            "word_ar": "يَلِدْ",
            "word_en": "He begets",
            "word_tr": "yalid",
            "audio_word_path": "audio/words/112_003_002.mp3"
          },
          {
            "id": "003",
            "word_ar": "وَلَمْ",
            "word_en": "and not",
            "word_tr": "walam",
            "audio_word_path": "audio/words/112_003_003.mp3"
          },
          {
            "id": "004",
            "word_ar": "يُولَدْ",
            "word_en": "He is begotten",
            "word_tr": "yūlad",
            "audio_word_path": "audio/words/112_003_004.mp3"
          }
        ]
      },
      "004": {
        "ayah_ar": "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
        "ayah_en": "Nor is there to Him any equivalent.\"",
        "ayah_tr": "walam yakun lahu kufuwan aḥadun",
        "audio_ayah_path": {
          "saood_ash_shuraym": "audio/ayahs/saood_ash_shuraym/112004.mp3",
          "abdurrahmaan_as_sudais": "audio/ayahs/abdurrahmaan_as_sudais/112004.mp3",
          ...,
        },
        "words": [
          {
            "id": "001",
            "word_ar": "وَلَمْ",
            "word_en": "And not",
            "word_tr": "walam",
            "audio_word_path": "audio/words/112_004_001.mp3"
          },
          {
            "id": "002",
            "word_ar": "يَكُنْ",
            "word_en": "is",
            "word_tr": "yakun",
            "audio_word_path": "audio/words/112_004_002.mp3"
          },
          {
            "id": "003",
            "word_ar": "لَهُ",
            "word_en": "for Him",
            "word_tr": "lahu",
            "audio_word_path": "audio/words/112_004_003.mp3"
          },
          {
            "id": "004",
            "word_ar": "كُفُوًا",
            "word_en": "equivalent",
            "word_tr": "kufuwan",
            "audio_word_path": "audio/words/112_004_004.mp3"
          },
          {
            "id": "005",
            "word_ar": "أَحَدٌ",
            "word_en": "any [one]",
            "word_tr": "aḥadun",
            "audio_word_path": "audio/words/112_004_005.mp3"
          }
        ]
      }
    }
  },
  "113": {
    "surah_name_ar": "الفلق",
    "surah_name_en": "The Dawn",
    "surah_name_tr": "Al-Falaq",
    "ayah_count": 5,
    ...
  }
  ...
}
```

---

## Featured Reciters

The dataset includes complete Quran recitations from 30 renowned reciters:

| Reciter                       |               Style | Samples |
| ----------------------------- | ------------------: | ------: |
| Abdul Basit                   |            Murattal |   6,236 |
| Abdullaah 3awwaad Al-Juhaynee | Murattal / Standard |   6,236 |
| Abdullah Basfar               | Murattal / Standard |   6,236 |
| Abdul Samad                   | Murattal / Standard |   6,236 |
| Abdurrahmaan As-Sudais        | Murattal / Standard |   6,236 |
| Abu Bakr Ash-Shaatree         | Murattal / Standard |   6,236 |
| Alafasy                       | Murattal / Standard |   6,236 |
| Ali Jaber                     | Murattal / Standard |   6,236 |
| Ayman Sowaid                  | Murattal / Standard |   6,236 |
| Banna                         | Murattal / Standard |   6,236 |
| Fares Abbad                   | Murattal / Standard |   6,236 |
| Ghamadi                       | Murattal / Standard |   6,236 |
| Hani Rifai                    | Murattal / Standard |   6,236 |
| Hudhaify                      | Murattal / Standard |   6,236 |
| Husary                        | Murattal / Standard |   6,236 |
| Husary (Mujawwad)             |            Mujawwad |   6,236 |
| Husary (Teacher)              |  Teacher Recitation |   6,236 |
| Husary (Warsh)                |               Warsh |   6,236 |
| Ibrahim Akhdar                | Murattal / Standard |   6,236 |
| Minshawy (Mujawwad)           |            Mujawwad |   6,236 |
| Minshawy (Murattal)           |            Murattal |   6,236 |
| Minshawy (Teacher)            |  Teacher Recitation |   6,236 |
| Mostafa Ismail                | Murattal / Standard |   6,236 |
| Muhammad Jibreel              | Murattal / Standard |   6,236 |
| Muhsin Al-Qasim               | Murattal / Standard |   6,236 |
| Nasser Alqatami               |            Murattal |   6,236 |
| Saood Ash-Shuraym             | Murattal / Standard |   6,236 |
| Tunaiji                       | Murattal / Standard |   6,236 |
| Yassin (Warsh)                |               Warsh |   6,236 |
| Yasser Ad-Dussary             |            Murattal |   6,236 |


**Total**: 30 reciters × 6,236 ayahs = 187,080 audio samples

---

## **Data Creation (Sources Used)**

The dataset integrates multiple high-quality, publicly available Quranic resources. Below are the exact sources and commands used to obtain the raw data.

This dataset was constructed by combining several high-quality, publicly accessible Quranic resources. Below are the exact sources and commands used to obtain the raw data. Along with that is all the data processing, cleaning, validation, and alignment steps which fully reproducible using the accompanying GitHub repository.

### 🔗 **Project Repository (Full Pipeline & Scripts)**

All scripts used for downloading, parsing, aligning, and generating the final dataset are available here:

👉 **[https://github.com/umar1997/quran-md](https://github.com/umar1997/quran-md)**


### **1. Word-by-Word Dataset (Arabic + English + Metadata)**

Source of individual word mappings, translations, and segmentation.

```bash
curl -O https://ia803409.us.archive.org/0/items/quran-wordbyword/wbw.zip
unzip wbw.zip
```

### **2. QuranWBW (Open-Source Word-Level Annotation Project)**

Provides structured JSON files, word metadata, and linguistic annotations.

```bash
git clone https://github.com/qazasaz/quranwbw.git
```

### **3. Ayah-Level Speech Dataset (Kaggle)**

Contains recited ayah-level audio used for validating word boundaries and recitation alignment.

```bash
#!/bin/bash
curl -L -o ./quran-ayat-speech-to-text.zip https://www.kaggle.com/api/v1/datasets/download/bigguyubuntu/quran-ayat-speech-to-text

unzip quran-ayat-speech-to-text.zip
```

---

## 📥 How to Download the Data

You can download the complete Quran-MD dataset using one of the following methods:
1. Download the complete Quran-MDdataset (audio + metadata) using `snapshot_download`.
2. Download the TAR File Using `hf_hub_download`.
3. Load the ayah/word datasets directly using 🤗 Datasets.

---

### 🔹 **1. Download Full Dataset Using `snapshot_download` (Recommended)**

**Without HF Token (Public Access)**

```python
import os
from huggingface_hub import snapshot_download

dataset_path = "<path-to-save-dataset>"

snapshot_download(
    repo_id="Buraaq/quran-audio-text-dataset",
    repo_type="dataset",
    local_dir=dataset_path
)
```

---

**With HF Token (Private / Future-Proofing)**

```bash
export HF_TOKEN="your_hf_token"
```

```python
from huggingface_hub import snapshot_download

dataset_path = "<path-to-save-dataset>"

snapshot_download(
    repo_id="Buraaq/quran-audio-text-dataset",
    repo_type="dataset",
    local_dir=dataset_path,
    use_auth_token=HF_TOKEN
)
```

```bash
# Extract the TAR file
tar -xvzf quran_audio_data.tar.gz
```

This will create:

```
quran_audio_data/
 ├── audio/
 └── data/
```

---

### 🔹 **2. Download the TAR File Using `hf_hub_download`**

```python
from huggingface_hub import hf_hub_download

file_path = hf_hub_download(
    repo_id="Buraaq/quran-audio-text-dataset",
    filename="quran_audio_data.tar.gz",
    repo_type="dataset",
    use_auth_token=HF_TOKEN
)

print("Downloaded To Path:", file_path)
```

```bash
# Extract the TAR file
tar -xvzf quran_audio_data.tar.gz
```

This will create:

```
quran_audio_data/
 ├── audio/
 └── data/
```

---

### 🔹 **3. Load the Ayah-Level and  Word-Level Dataset (HuggingFace Datasets)**

```python
from datasets import load_dataset

ayah_dataset = load_dataset("Buraaq/quran-md-ayahs")
```


```python
from datasets import load_dataset

word_dataset = load_dataset("Buraaq/quran-md-words")
```

---

## Dataset Statistics

### Reciter Coverage
- All 30 reciters have complete Quran (114 surahs)
- **Ayah-level recordings**: 187,080 unique reciter-ayah combinations
- **Word-level recordings**: 77,429 individual word pronunciations

### Language Distribution
- **Arabic**: 100% coverage (original text)
- **English**: 100% coverage (translations)
- **Transliteration**: 100% coverage (romanized)

## Ethical Considerations

### Religious Sensitivity
- This dataset contains sacred Islamic text and recitations
- Users should handle the content with appropriate respect

### Cultural Context
- Quranic recitation follows specific rules (Tajweed)
- Different recitation styles (Qira'at) may be represented
- Cultural and religious context is important for proper usage


## Citation

If you use this dataset in your research, please cite:

```bibtex
@misc{salman2026quranmdfinegrainedmultilingualmultimodal,
      title={Quran-MD: A Fine-Grained Multilingual Multimodal Dataset of the Quran}, 
      author={Muhammad Umar Salman and Mohammad Areeb Qazi and Mohammed Talha Alam},
      year={2026},
      eprint={2601.17880},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2601.17880}, 
}
```


## Related Datasets

- **📝 [Quran-MD - Word](https://huggingface.co/datasets/Buraaq/quran-md-words)**: Individual word pronunciations (77,429 samples)
- **📝 [Quran-MD - Ayah](https://huggingface.co/datasets/Buraaq/quran-md-ayahs)**: Complete verse recitations (187,080 samples)

## Contact and Support

- **Hugging Face Profile**: umarsalman
- **GitHub Profile**: umar1997
- **Dataset Issues**: Please open an issue on the repository.

Feel free to reach out for dataset issues, research collaborations, or community contributions.

---

*"And We have certainly made the Quran easy for remembrance, so is there any who will remember?"* - Quran 54:17