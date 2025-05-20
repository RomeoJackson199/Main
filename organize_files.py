import os
import shutil
from pathlib import Path

FILE_TYPES = {
    'Images': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'],
    'Documents': ['.pdf', '.doc', '.docx', '.txt', '.xls', '.xlsx', '.ppt', '.pptx'],
    'Videos': ['.mp4', '.avi', '.mov', '.mkv', '.flv', '.wmv'],
}


def get_category(extension):
    for category, extensions in FILE_TYPES.items():
        if extension.lower() in extensions:
            return category
    return 'Others'


def organize_folder(root_dir):
    root_path = Path(root_dir)
    if not root_path.exists():
        print(f"Directory '{root_dir}' does not exist.")
        return

    for base, _, files in os.walk(root_path):
        for filename in files:
            file_path = Path(base) / filename
            if file_path.is_symlink() or not file_path.is_file():
                continue

            extension = file_path.suffix
            category = get_category(extension)
            target_dir = root_path / category
            target_dir.mkdir(exist_ok=True)

            target_path = target_dir / filename
            counter = 1
            while target_path.exists():
                target_path = target_dir / f"{file_path.stem}_{counter}{file_path.suffix}"
                counter += 1

            shutil.move(str(file_path), str(target_path))


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Organize files by type.")
    parser.add_argument("path", help="Root directory to organize")
    args = parser.parse_args()

    organize_folder(args.path)

