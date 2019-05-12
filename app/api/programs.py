from app.api import bp
from flask import jsonify
from app.models import Program

@bp.route('/programs/<int:id>', methods=['GET'])
def get_program(id):
    return jsonify(Program.query.get_or_404(id).to_dict())

@bp.route('/programs', methods=['GET'])
def get_programs():
    progs = Program.query.all()
    data = {
        'programs': [prog.to_dict() for prog in progs]
    }
    return jsonify(data)
    