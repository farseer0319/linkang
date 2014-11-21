package com.linkang.platform.backend.meta;
// Generated 2014-11-21 10:03:57 by Hibernate Tools 3.2.2.GA


import java.util.List;
import javax.naming.InitialContext;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Example;

/**
 * Home object for domain model class LkOrderForm.
 * @see com.linkang.platform.backend.meta.LkOrderForm
 * @author Hibernate Tools
 */
public class LkOrderFormHome {

    private static final Log log = LogFactory.getLog(LkOrderFormHome.class);

    private final SessionFactory sessionFactory = getSessionFactory();
    
    protected SessionFactory getSessionFactory() {
        try {
            return (SessionFactory) new InitialContext().lookup("SessionFactory");
        }
        catch (Exception e) {
            log.error("Could not locate SessionFactory in JNDI", e);
            throw new IllegalStateException("Could not locate SessionFactory in JNDI");
        }
    }
    
    public void persist(LkOrderForm transientInstance) {
        log.debug("persisting LkOrderForm instance");
        try {
            sessionFactory.getCurrentSession().persist(transientInstance);
            log.debug("persist successful");
        }
        catch (RuntimeException re) {
            log.error("persist failed", re);
            throw re;
        }
    }
    
    public void attachDirty(LkOrderForm instance) {
        log.debug("attaching dirty LkOrderForm instance");
        try {
            sessionFactory.getCurrentSession().saveOrUpdate(instance);
            log.debug("attach successful");
        }
        catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }
    
    public void attachClean(LkOrderForm instance) {
        log.debug("attaching clean LkOrderForm instance");
        try {
            sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
            log.debug("attach successful");
        }
        catch (RuntimeException re) {
            log.error("attach failed", re);
            throw re;
        }
    }
    
    public void delete(LkOrderForm persistentInstance) {
        log.debug("deleting LkOrderForm instance");
        try {
            sessionFactory.getCurrentSession().delete(persistentInstance);
            log.debug("delete successful");
        }
        catch (RuntimeException re) {
            log.error("delete failed", re);
            throw re;
        }
    }
    
    public LkOrderForm merge(LkOrderForm detachedInstance) {
        log.debug("merging LkOrderForm instance");
        try {
            LkOrderForm result = (LkOrderForm) sessionFactory.getCurrentSession()
                    .merge(detachedInstance);
            log.debug("merge successful");
            return result;
        }
        catch (RuntimeException re) {
            log.error("merge failed", re);
            throw re;
        }
    }
    
    public LkOrderForm findById( long id) {
        log.debug("getting LkOrderForm instance with id: " + id);
        try {
            LkOrderForm instance = (LkOrderForm) sessionFactory.getCurrentSession()
                    .get("com.linkang.platform.backend.meta.LkOrderForm", id);
            if (instance==null) {
                log.debug("get successful, no instance found");
            }
            else {
                log.debug("get successful, instance found");
            }
            return instance;
        }
        catch (RuntimeException re) {
            log.error("get failed", re);
            throw re;
        }
    }
    
    public List findByExample(LkOrderForm instance) {
        log.debug("finding LkOrderForm instance by example");
        try {
            List results = sessionFactory.getCurrentSession()
                    .createCriteria("com.linkang.platform.backend.meta.LkOrderForm")
                    .add(Example.create(instance))
            .list();
            log.debug("find by example successful, result size: " + results.size());
            return results;
        }
        catch (RuntimeException re) {
            log.error("find by example failed", re);
            throw re;
        }
    } 
}

