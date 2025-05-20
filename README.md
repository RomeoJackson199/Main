# File Organizer

This repository contains a simple Python script `organize_files.py` which organizes files into subfolders based on their file type. The script works recursively and avoids overwriting existing files by renaming duplicates.

## Usage

Run the script with Python and provide the path to the directory you want to organize:

```bash
python organize_files.py C:\\path\\to\\your\\folder
```

On Linux or macOS:

```bash
python3 organize_files.py /path/to/your/folder
```

The script will create subfolders (e.g., `Images`, `Documents`, `Videos`, and `Others`) and move files into them.
