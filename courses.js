
document.addEventListener('DOMContentLoaded', function() {
  const courses = [
    {
      id: 'web-dev',
      title: 'Web Development',
      description: 'Learn HTML, CSS, JavaScript, and modern frameworks',
      feePerSemester: 50000,
      duration: 4
    },
    {
      id: 'cs',
      title: 'Computer Science',
      description: 'Comprehensive computer science fundamentals',
      feePerSemester: 60000
      , duration: 4
    },
    {
      id: 'data-science',
      title: 'Data Science',
      description: 'Master data analysis, ML, and visualization',
      feePerSemester: 65000
      , duration: 4
    },
    {
      id: 'cyber-security',
      title: 'Cyber Security',
      description: 'Network security, ethical hacking, and cryptography',
      feePerSemester: 55000
      , duration: 4
    },
    {
      id: 'ai',
      title: 'Artificial Intelligence',
      description: 'AI, machine learning, and neural networks',
      feePerSemester: 70000
      , duration: 4
    },
    {
      id: 'software-eng',
      title: 'Software Engineering',
      description: 'Software development lifecycle and methodologies',
      feePerSemester: 58000
      , duration: 4
    },
    {
      id: 'cloud',
      title: 'Cloud Computing',
      description: 'AWS, Azure, and cloud architecture',
      feePerSemester: 62000
      , duration: 4
    },
    {
      id: 'mobile-app',
      title: 'Mobile App Development',
      description: 'iOS and Android app development',
      feePerSemester: 56000
      , duration: 4
    }
  ];

  const coursesRow = document.querySelector('#courses-row');
  if (coursesRow) {
    courses.forEach(course => {
      const courseCard = `
        <div class="col-md-6 col-lg-3">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">${course.title}</h5>
              <p class="card-text">${course.description}</p>
              <p class="card-text"><strong>Fee: PKR ${course.feePerSemester.toLocaleString()}/semester</strong></p>
              <p class="card-text"><strong>Duration: ${course.duration.toLocaleString()} years</strong></p>
            </div>
          </div>
        </div>
      `;
      coursesRow.innerHTML += courseCard;
    });
  }

  const clearBtn = document.querySelector('.input-header button');
  const courseSelect = document.querySelector('#courseSelect');
  const semesterCount = document.querySelector('#semesterCount');
  const scholarshipInput = document.querySelector('#scholarship');
  const submitBtn = document.querySelector('.submit-btn');
  const emptyDiv = document.querySelector('.empty');
  const filledDiv = document.querySelector('.filled');
  const totalFeeSpan = document.querySelector('#total-fee');
  const discountSpan = document.querySelector('#discount');
  const payableFeeSpan = document.querySelector('#payable-fee');

  if (clearBtn) {
    clearBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      courseSelect.selectedIndex = -1;
      semesterCount.value = '';
      scholarshipInput.value = '';

      if (emptyDiv && filledDiv) {
        emptyDiv.style.display = 'flex';
        filledDiv.style.display = 'none';
      }
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      const selectedOptions = Array.from(courseSelect.selectedOptions);
      const selectedCourseIds = selectedOptions.map(option => option.value);

      const semesters = parseInt(semesterCount.value);
      const scholarship = parseFloat(scholarshipInput.value) || 0;

      if (selectedCourseIds.length === 0) {
        window.alert('Please select at least one course');
        return;
      }

      if (!semesters || semesters < 1 || semesters > 8) {
        window.alert('Please enter a valid number of semesters (1-8)');
        return;
      }

      if (scholarship < 0 || scholarship > 100) {
        window.alert('Scholarship percentage must be between 0 and 100');
        return;
      }

      let totalFeePerSemester = 0;
      selectedCourseIds.forEach(courseId => {
        const course = courses.find(c => c.id === courseId);
        if (course) {
          totalFeePerSemester += course.feePerSemester;
        }
      });

      const totalFee = totalFeePerSemester * semesters;
      const discountAmount = (totalFee * scholarship) / 100;
      const payableFee = totalFee - discountAmount;

      totalFeeSpan.textContent = `PKR ${totalFee.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      discountSpan.textContent = `PKR ${discountAmount.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      payableFeeSpan.textContent = `PKR ${payableFee.toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

      if (emptyDiv && filledDiv) {
        emptyDiv.style.display = 'none';
        filledDiv.style.display = 'flex';
      }
    });
  }
});
