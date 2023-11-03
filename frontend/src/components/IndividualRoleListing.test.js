/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import IndividualRoleListing from './IndividualRoleListing';
import '@testing-library/jest-dom';

const ROLE_LISTING = {
  "role_listing_id": 1,
  "role_id": 2,
  "role_listing_desc": "Delivers diverse learning products, adapts facilitation for optimal outcomes, drives continuous learning, and evaluates curriculum effectiveness in various environments, while maintaining strong communication and stakeholder management skills.",
  "role_listing_source": 2,
  "role_listing_open": "2023-10-01T16:34:54",
  "role_listing_close": "2023-12-01T16:34:54",
  "role_listing_creator": 2,
  "role_listing_updater": null,
  "role_listing_ts_create": "2023-11-02T14:59:51",
  "role_listing_ts_update": null,
  "dept": "HUMAN RESOURCE AND ADMIN",
  "role_name": "Learning Facilitator / Trainer",
  "role_description": "The Learning Facilitator delivers learning products and services in a variety of environments, using multiple learning delivery modes and methods. He/She assesses learning needs and adapts the facilitation approach to reflect desired learning outcomes and learner needs. He is responsible for knowledge and skills transfer by delivering learning content, facilitating group discussions and responding to queries. He drives learner development and commitment to continuous learning by actively providing feedback and learner support. He evaluates curriculum effectiveness and recommends improvement areas by collecting learner feedback as well as analysing learning delivery approaches and materials.He is a strong communicator who builds trusted relationships and creates a cooperative and engaging learning environment. He is adaptable and adept at managing multiple stakeholders.He works in multiple different environments, including different learning venues and client sites, and regularly interacts with digital systems.",
  "skills": [
      "Python Programming"
  ]
}

const USER_SKILLS = [
  "Pascal Programming",
  "Python Programming"
]

const USER = {
  "id": 2,
  "name": "Vincent Rex Colins",
  "password": "password123",
  "sys_role": "admin"
}

const formattedClosing = (role_listing_close) => {
  return new Date(role_listing_close).toLocaleDateString(
  "en-SG",
  { year: "numeric", month: "long", day: "numeric" }
);
}

test('renders role listing and skills', () => {
  const { getByText } = render(<IndividualRoleListing roleListing={ROLE_LISTING} userSkills={USER_SKILLS} user={USER} />);
  const elementsToCheck = ["role_name", "role_description", "role_listing_desc", "role_listing_desc"]
  elementsToCheck.forEach((element) => {
    const elementToCheck = getByText(ROLE_LISTING[element]);
    expect(elementToCheck).toBeInTheDocument();
  });

  const formattedClosingElement = getByText(formattedClosing(ROLE_LISTING.role_listing_close));
  expect(formattedClosingElement).toBeInTheDocument();

  ROLE_LISTING.skills.forEach((skill) => {
    const element = getByText(skill);
    expect(element).toBeInTheDocument();
  })
});

