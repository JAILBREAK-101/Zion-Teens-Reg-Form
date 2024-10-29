@app.route('/register', methods=['POST'])
def register():
    # Extract user details from the form
    first_name = request.form['firstName']
    last_name = request.form['lastName']
    dob = request.form['dob']
    education_level = request.form['educationLevel']
    department = request.form['department']
    email = request.form['email']
    password = request.form['password']

    # Create new user record in the database
    user_id = create_user(first_name, last_name, dob, education_level, department, email, password)
    
    # Generate QR code URL
    qr_code_url = f"https://yourwebsite.com/attendance?user_id={user_id}"
    qr_code_image = generate_qr_code(qr_code_url)
    
    # Log the user in
    login_user(user_id)

    # Redirect to profile page or display QR code
    return redirect('/profile')

@app.route('/attendance')
def attendance():
    user_id = request.args.get('user_id')

    if user_is_logged_in(user_id):
        record_attendance(user_id)
        bible_verse = get_bible_verse_for_today(user_id)
        return render_template('attendance_success.html', verse=bible_verse)
    else:
        return redirect('/register')
