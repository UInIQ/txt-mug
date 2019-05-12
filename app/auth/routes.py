from app.auth import bp
from app import db
from flask import current_app, render_template, make_response, request, redirect, url_for, flash
from flask_login import login_user, logout_user, current_user, login_required
from app.models import User
from app.auth.forms import LoginForm
from werkzeug.urls import url_parse

def build_response(code,text=''):
    resp = make_response(text)
    resp.status_code = code
    #resp.headers['Access-Control-Allow-Origin'] = ALLOWED_ORIGIN
    #resp.headers['Access-Control-Allow-Methods'] = '*'
    #resp.headers['Access-Control-Allow-Domain'] = '*'
    #resp.headers['Access-Control-Allow-Credentials'] = True
    resp.headers['Content-Type'] = 'application/json'
    return resp

@bp.route('/')
@bp.route('/index')
@login_required
def index():
    current_app.logger.debug('Index route')
    return render_template('index.html')

@bp.route('/login', methods=['GET', 'POST'])
def login():
    current_app.logger.debug('/login - Login route')
    if current_user.is_authenticated:
        current_app.logger.debug('/login - already logged in')
        return redirect(url_for('auth.index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('auth.login'))
        login_user(user, remember=form.remember_me.data)
        #FIX: update last login date
        current_app.logger.debug('/login - completed login')
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('api.index')
        return redirect(next_page)
    return render_template('login.html', title='Log In', form=form)

@bp.route('/logout')
def logout():
    current_app.logger.debug('/logout: Logout route')
    logout_user()
    return redirect(url_for('api.index'))

@bp.route('/password', methods=['PUT'])
@login_required
def change_password():
    current_app.logger.debug('/password: request: ' + str(request.json))
    if not 'password' in request.json or not 'old_password' in request.json:
        build_response(400)
    current_app.logger.debug('/password: Password route')
    user = current_user.query.get(current_user.id)
    if not user.check_password(request.json['old_password']):
        current_app.logger.debug('/password: old pw was bad')
        return build_response(400)
    user.set_password(request.json['password'])
    db.session.commit()
    flash('Your password was updated.')
    return build_response(200)
