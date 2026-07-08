/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Check } from '@openedx/paragon/icons';
import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getApiBodyMessage } from '../../api/apiMessage';
import { useUserRole } from '../../contexts/UserRoleContext';
import { hasDisplayValue } from '../../utils/hasDisplayValue';
import feedbackMessages from './messages';
import './feedbackComponent.scss';
import emoji1 from './emoji/emoji-1.png';
import emoji2 from './emoji/emoji-2.png';
import emoji3 from './emoji/emoji-3.png';
import emoji4 from './emoji/emoji-4.png';

export const FEEDBACK_FOR_THIS_PAGE = 'This page';
export const FEEDBACK_FOR_OVERALL_PLATFORM = 'Overall platform';

const INITIAL_FORM_DATA = {
  mood: '',
  feedbackType: FEEDBACK_FOR_THIS_PAGE,
  description: '',
};

const FeedbackComponent = ({ isOpen, setIsOpen }) => {
  const { formatMessage } = useIntl();
  const { role, userName } = useUserRole();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const canSubmit = (
    hasDisplayValue(formData.feedbackType)
    && hasDisplayValue(formData.description)
    && !isSubmitting
  );

  const moods = [
    {
      value: 'not_good',
      label: formatMessage(feedbackMessages.moodNotGood),
      emoji: emoji1,
      rating: 1,
    },
    {
      value: 'okay',
      label: formatMessage(feedbackMessages.moodOkay),
      emoji: emoji2,
      rating: 2,
    },
    {
      value: 'good',
      label: formatMessage(feedbackMessages.moodGood),
      emoji: emoji3,
      rating: 3,
    },
    {
      value: 'love_it',
      label: formatMessage(feedbackMessages.moodLoveIt),
      emoji: emoji4,
      rating: 4,
    },
  ];

  const feedbackForOptions = [
    {
      value: FEEDBACK_FOR_THIS_PAGE,
      label: formatMessage(feedbackMessages.feedbackForThisPage),
    },
    {
      value: FEEDBACK_FOR_OVERALL_PLATFORM,
      label: formatMessage(feedbackMessages.feedbackForOverallPlatform),
    },
  ];

  useEffect(() => {
    if (!isOpen) {
      setFormData(INITIAL_FORM_DATA);
      setSubmitStatus(null);
      setStatusMessage('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleMoodClick = (value) => {
    setFormData((prev) => ({
      ...prev,
      mood: prev.mood === value ? '' : value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resolveUserEmail = () => {
    const authenticatedUser = getAuthenticatedUser();
    if (hasDisplayValue(authenticatedUser?.email)) {
      return authenticatedUser.email;
    }
    if (hasDisplayValue(userName) && userName.includes('@')) {
      return userName;
    }
    return '';
  };

  const formatLocalFeedbackTime = () => {
    const now = new Date();
    const pad = (value) => String(value).padStart(2, '0');
    const offsetMinutes = -now.getTimezoneOffset();
    const offsetSign = offsetMinutes >= 0 ? '+' : '-';
    const absOffset = Math.abs(offsetMinutes);
    const offsetHours = pad(Math.floor(absOffset / 60));
    const offsetMins = pad(absOffset % 60);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    const localDateTime = [
      `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
      `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
    ].join('T');

    return `${localDateTime}${offsetSign}${offsetHours}:${offsetMins} (${timeZone})`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setStatusMessage('');
    try {
      const httpClient = getAuthenticatedHttpClient();
      const apiUrl = `${getConfig().LMS_BASE_URL}/feedback/api/v1/submit-feedback/`;
      const selectedMood = moods.find((m) => m.value === formData.mood);

      const payload = {
        satisfaction_rating: selectedMood?.rating ?? null,
        experience: formData.description,
        feedback_for: formData.feedbackType || FEEDBACK_FOR_THIS_PAGE,
        page_url: window.location.href,
        extra_responses: {
          used_dark_mode: '',
          feedback_time: formatLocalFeedbackTime(),
        },
        email: resolveUserEmail(),
        interface: hasDisplayValue(role) ? role : '',
      };

      const response = await httpClient.post(apiUrl, payload);
      if (response.status < 200 || response.status >= 300) {
        throw Object.assign(new Error('API error'), { response });
      }

      setStatusMessage(
        getApiBodyMessage(response.data)
          || formatMessage(feedbackMessages.successMessage),
      );
      setSubmitStatus('success');
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setStatusMessage(
        getApiBodyMessage(error?.response?.data)
          || formatMessage(feedbackMessages.errorMessage),
      );
      setSubmitStatus('error');
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus(null);
        setStatusMessage('');
      }, 3000);
    }
  };

  return (
    <div className="feedback-container">
      <button
        type="button"
        className={`feedback-button vertical ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={formatMessage(
          isOpen ? feedbackMessages.closeFeedbackAria : feedbackMessages.openFeedbackAria,
        )}
      >
        <span className="text">
          {formatMessage(isOpen ? feedbackMessages.closeButton : feedbackMessages.feedbackButton)}
        </span>
      </button>

      {isOpen && (
        <div className="feedback-form-container">
          <div className="feedback-body">
            {submitStatus === 'success' ? (
              <div className="success-message">
                <Check className="check-icon" />
                {hasDisplayValue(statusMessage) && <p>{statusMessage}</p>}
              </div>
            ) : submitStatus === 'error' ? (
              <div className="error-message">
                {hasDisplayValue(statusMessage) && <p>{statusMessage}</p>}
              </div>
            ) : (
              <>
                <div className="feedback-question">
                  {formatMessage(feedbackMessages.question)}
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className="mood-rating">
                      {moods.map((mood) => (
                        <div className="mood-icon-wrapper" key={mood.value}>
                          <span
                            className={`mood-icon ${formData.mood === mood.value ? 'selected' : ''}`}
                            onClick={() => handleMoodClick(mood.value)}
                            role="button"
                            tabIndex={0}
                            aria-label={mood.label}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleMoodClick(mood.value);
                              }
                            }}
                          >
                            <img src={mood.emoji} alt="" aria-hidden />
                          </span>
                          <span className="mood-tooltip">{mood.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="radio-group">
                      {feedbackForOptions.map((option) => (
                        <label key={option.value} className="radio-label">
                          <input
                            type="radio"
                            name="feedbackType"
                            value={option.value}
                            checked={formData.feedbackType === option.value}
                            onChange={handleInputChange}
                            className="radio-input"
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="feedback-description">
                      {formatMessage(feedbackMessages.commentsLabel)}
                    </label>
                    <textarea
                      id="feedback-description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder={formatMessage(feedbackMessages.commentsPlaceholder)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="submit-button"
                    disabled={!canSubmit}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner" />
                        {formatMessage(feedbackMessages.submitting)}
                      </>
                    ) : (
                      formatMessage(feedbackMessages.submit)
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackComponent;
