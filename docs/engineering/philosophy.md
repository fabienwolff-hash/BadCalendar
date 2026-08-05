# Development Philosophy

## Purpose

This document defines the development philosophy of BadPlanner.

Unlike the architecture or coding guidelines, it explains **how development decisions should be made**.

Its purpose is to preserve the consistency of the project over time, regardless of who implements future evolutions.

---

# Philosophy

BadPlanner is designed to remain simple.

Every evolution must improve the product without increasing unnecessary complexity.

Whenever several solutions are possible, the simplest one that satisfies the functional need should be preferred.

---

# Start with the business model

Development always starts with the business model.

When a new feature is requested, the first question is not:

> "How should it be implemented?"

but:

> "Does the business model correctly represent this concept?"

If the model is incomplete, it must evolve before any implementation begins.

---

# Business before technology

Business rules always take precedence over technical implementation.

The code must adapt to the business model, never the opposite.

Temporary technical shortcuts should be avoided whenever they weaken the model.

---

# One responsibility, one place

Every concept must have a single owner.

Examples:

- business rules belong to business services;
- presentation belongs to the frontend;
- validation belongs to the administration module;
- configuration belongs to configuration services.

Duplicating responsibilities is considered technical debt.

---

# Backend owns the business

The frontend never computes business rules.

It displays information already prepared by the backend.

The backend remains the single source of business logic.

---

# Simplicity over sophistication

A simple solution is always preferred to a clever one.

Readability is more important than reducing a few lines of code.

Future maintainability is valued more than short-term optimisation.

---

# Measure before optimising

Performance optimisations are introduced only after measurements demonstrate a real need.

Premature optimisation is avoided.

---

# Incremental evolution

Every version is divided into small, independent and testable changes.

Each evolution should leave the project in a stable state.

Large refactorings should emerge naturally through successive improvements rather than massive rewrites.

---

# Documentation is part of the implementation

A feature is not considered complete until its documentation has been updated.

Documentation describes the actual implementation, not future intentions.

---

# Data first

The quality of the application depends primarily on the quality of its data.

Whenever possible:

- improve the Master;
- improve validation;
- improve the business model;

before adding code to compensate for poor data quality.

---

# Preserve simplicity for users

Every technical decision should ultimately make the application easier to use.

Additional complexity is acceptable only when it remains invisible to the user.

---

# Respect the ecosystem

BadPlanner does not try to replace existing tools.

Whenever another platform already performs a task correctly (such as BadNet), BadPlanner complements it instead of duplicating it.

---

# Long-term maintainability

The project is designed to evolve over many years.

Every implementation should therefore favour:

- readability;
- explicit code;
- modularity;
- low coupling;
- clear responsibilities.

---

# Guiding question

Before implementing any evolution, ask the following question:

> **Does this change make BadPlanner simpler, clearer or more useful for parents without unnecessarily increasing its complexity?**

If the answer is no, the implementation should be reconsidered.
