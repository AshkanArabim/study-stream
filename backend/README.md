# setup
- `pip install venv`
- `python -m venv venv` (create a virtual environment called venv)
- activate the virtual environment:
  - on windows: `venv\bin\Activate.ps1`
  - on linux / mac: `source venv/bin/activate`
- `pip install requirements.txt`
- **before you push, make sure to update `requirements.txt`**
  - `pip freeze > requirements.txt`
