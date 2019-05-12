from app.api import bp
from flask import jsonify
from app.models import Image, ImageStatus
from app import db
from sqlalchemy import func

@bp.route('/images/counts', methods=['GET'])
def get_image_counts():
    output=[]
    counts_list = db.session.query(func.count(Image.id),ImageStatus.label).group_by(Image.status).join(ImageStatus).all()
    for count in counts_list:
        item={}
        item['status']=count[1]
        item['count']=count[0]
        output.append(item)
    return jsonify(output)